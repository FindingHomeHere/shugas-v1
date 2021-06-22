import nextConnect from 'next-connect';
import promisify from 'util.promisify';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

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

const updatePassword = async (req, res, next) => {
  try {
    connect();
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
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
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
  } catch (err) {
    console.log(err);
  }
};

const onError = (err, req, res) => {
  console.log('SERVER ERROR', err);
  res.status(err.statusCode || 500).send(err.message);
};

const handler = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
}).patch(updatePassword);

export default handler;
