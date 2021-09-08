import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

import catchAsync from '../../../../../util/catchAsync';
import User from '../../../../../models/userModel';
import dbConnect from '../../../../../util/mongodb';
import AppError from '../../../../../util/appError';

const connect = async () => await dbConnect();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 86400000
    ), // 86400000 ms in a day
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.setHeader('Set-Cookie', serialize(token, cookieOptions));

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const forgotPassword = catchAsync(async (req, res, next) => {
  connect();
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const protocol = req.protocol ? req.protocol : 'http';

  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const resetURL = `${protocol}://${req.headers.host}/admin/resetPassword/${resetToken}`;

    const email = {
      to: user.email,
      from: process.env.EMAIL_FROM,
      subject: 'Urgent!! Password reset link will expire in 10 minutes!',
      templateId: process.env.EMAIL_PASSWORD_RESET,
      dynamicTemplateData: {
        user,
        link: resetURL,
      },
    };

    await sgMail
      .send(email)
      .then(() => {
        console.log('Reset link sent');
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  connect();

  // Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired, if user, set new password
  if (!user) {
    return next(new AppError('Token is invalid, or expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Update changedPasswordAt
  // Log user in, send jwt
  createSendToken(user, 200, res);
});

const onError = (err, req, res) => {
  console.log('SERVER ERROR', err);
  res.status(err.statusCode || 500).send(err.message);
};

const handler = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
})
  .post(forgotPassword)
  .patch(resetPassword);

export default handler;
