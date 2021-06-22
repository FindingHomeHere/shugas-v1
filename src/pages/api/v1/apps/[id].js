import nextConnect from 'next-connect';

import AppError from '../../../../../util/appError';
import dbConnect from '../../../../../util/mongodb';
import Application from '../../../../../models/applicationModel';

const updateApp = async (req, res) => {
  try {
    await dbConnect();
    const { id, isViewed } = req.body.doc;
    const doc = await Application.findByIdAndUpdate(
      id,
      { isViewed: isViewed },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log('UPDATE APPLICATION ERROR 🌪', err);
    res.status(500).json({
      status: 'error',
      data: {
        err,
      },
    });
  }
};

const deleteApp = async (req, res, next) => {
  try {
    await dbConnect();
    const { id } = req.body.doc;
    const doc = await Application.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.log('DELETE APPLICATION ERROR 🌪', err);
    res.status(500).json({
      status: 'error',
      data: {
        err,
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
});

handler.patch(updateApp);
handler.delete(deleteApp);

export default handler;
