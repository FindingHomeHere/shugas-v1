import nextConnect from 'next-connect';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

import dbConnect from '../../../../util/mongodb';
import User from '../../../../models/userModel';
import AppError from '../../../../util/appError';

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

  res.setHeader('Set-Cookie', serialize('jwt', token, cookieOptions));

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const loginUser = async (req, res) => {
  try {
    connect();
    const { email, password } = req.body;

    // Check if email and pw exist
    if (!email || !password) {
      return new AppError('Please Provide Email and Password!', 400);
    }

    // check if user exists && pw correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return new AppError('Incorrect Email or Password', 401);
    }
    createSendToken(user, 200, res);
  } catch (err) {
    console.error(err);
  }
};

const onError = (err, req, res) => {
  console.error('SERVER ERROR', err);
  res.status(err.statusCode || 500).send(err.message);
};

const handler = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
}).post(loginUser);

export default handler;
