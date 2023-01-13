import nextConnect from 'next-connect';

import User from '../../../../models/userModel';
import dbConnect from '../../../../util/mongodb';

const createUser = async (req, res) => {
  try {
    await dbConnect();
    const doc = await User.create({
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      data: {
        error: err.message,
      },
    });
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
}).post(createUser);

export default handler;
