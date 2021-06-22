import nextConnect from 'next-connect';

import User from '../../../../../models/userModel';

const getAllUsers = catchAsync(async (req, res, next) => {
  const doc = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
