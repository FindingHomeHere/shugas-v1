import nc from 'next-connect';

import Application from '../../../../../models/applicationModel';
import dbConnect from '../../../../../util/mongodb';

const updateApp = async (req, res) => {
  try {
    await dbConnect();
    const doc = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
    res.status(400).json({ status: 'Error', data: err });
  }
};

const deleteApp = async (req, res, next) => {
  const doc = await Application.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const onError = (err, req, res) => {
  console.log('SERVER ERROR', err);
  res.status(err.statusCode || 500).send(err.message);
};

const handler = nc({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
});

handler.patch(updateApp).delete(deleteApp);

export default handler;
