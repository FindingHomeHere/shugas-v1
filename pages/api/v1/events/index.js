import multer from 'multer';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';

import Event from '../../../../models/eventModel';
import dbConnect from '../../../../util/mongodb';

const connect = async () => await dbConnect();

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadEvent = upload.single('event');

const updateEvent = async (req, res) => {
  try {
    connect();
    const s3 = new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_HIDDEN_KEY,
      },
      region: process.env.AWS_AREA,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `events/event.pdf`,
      Body: req.file.buffer,
      ACL: 'public-read',
    };

    const post = s3.upload(params, async (err, data) => {
      try {
        const fileName = data.Location;
        const doc = await Event.findByIdAndUpdate(
          { _id: process.env.EVENT_ID },
          {
            fileName: fileName,
          }
        );

        res.status(201).json({
          status: 'success',
          data: {
            doc,
          },
        });
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Event Upload Error', data: err });
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
})
  .use(uploadEvent)
  .patch(updateEvent);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
