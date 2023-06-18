'use-strict';
import Event from '../../../../models/eventModel';
import dbConnect from '../../../../util/mongodb';

export default async function helper(req, res) {
  const { method } = req;

  dbConnect();

  switch (method) {
    case 'GET':
      try {
        const eventList = await Event.find();
        const doc = eventList[eventList.length - 1];

        res.status(200).json({
          status: 'Success',
          data: {
            data: doc,
          },
        });
      } catch (err) {
        res.status(400).json({ status: 'Error', data: err });
      }
      break;
    default:
      res.status(404).json({ status: 'error', data: null });
  }
}
