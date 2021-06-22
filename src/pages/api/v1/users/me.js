import nextConnect from 'next-connect';
import promisify from 'util.promisify';
import jwt from 'jsonwebtoken';

import User from '../../../../../models/userModel';
import dbConnect from '../../../../../util/mongodb';
import AppError from '../../../../../util/appError';

const onError = (err, req, res, next) => {
  console.log('SERVER ERROR', err);
  res.status(err.statusCode || 500).json({
    error: err.message,
  });
};

let globalUser = {};

const handler = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
});

const connect = async () => await dbConnect();

handler.get(
  async (req, res, next) => {
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
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // check if user changed password after token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      globalUser = currentUser;
      return next();
    }
    next();
  },
  async (req, res, next) => {
    connect();

    let query = User.findById(globalUser.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  }
);

export default handler;
