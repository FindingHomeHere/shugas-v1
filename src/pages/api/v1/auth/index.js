import crypto from 'crypto';
import promisify from 'util.promisify';
import jwt from 'jsonwebtoken';

import catchAsync from '../../../../../util/catchAsync';
import User from '../../../../../models/userModel';
import AppError from '../../../../../util/appError';
import Email from '../../../../../util/email';

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

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError('Some Data is missing... try again!', 401));
  }

  const url = `${req.protocol}://localhost:3000/admin`; // TODO: FIX FOR PRODUCTION
  await new Email(newUser, url).sendTeamWelcome();
  createSendToken(newUser, 201, res);
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and pw exist
  if (!email || !password) {
    return next(new AppError('Please Provide Email and Password!', 400));
  }

  // check if user exists && pw correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or Password', 401));
  }
  createSendToken(user, 200, res);
  next();
});

const logout = (req, res) => {
  res.cookie('jwt', 'null', {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

const protect = catchAsync(async (req, res, next) => {
  // Getting token and check if its exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to gain access!', 401)
    );
  }
  // token verification
  const decoded = await jwt.verify(token, `${process.env.JWT_SECRET}`);

  // check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('This user no longer exists', 401));
  }

  // check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password, please log in again', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, no errors!
const isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next();
    }
    // check if user changed password after token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }
    // THERE IS A LOGGED IN USER
    res.locals.user = currentUser;
    return next();
  }
  next();
});

const restrict = (...roles) => {
  return (req, res, next) => {
    // Roles: ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
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
  // Get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
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

const updatePassword = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token) {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // check if user still exists
    const user = await User.findById(decoded.id).select('+password');
    // Check if password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Your password is incorrect', 401));
    }
    // If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // Login user, send JWT
    createSendToken(user, 200, res);
  }
  next();
});

export default {
  createUser,
  loginUser,
  logout,
  protect,
  restrict,
  isLoggedIn,
  resetPassword,
  updatePassword,
  forgotPassword,
};
