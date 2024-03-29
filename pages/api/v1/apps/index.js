import multer from 'multer';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';

import Application from '../../../../models/applicationModel';
import dbConnect from '../../../../util/mongodb';
import sendEmail from '../../../../util/Sendgrid';

const connect = async () => await dbConnect();

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadResume = upload.single('resume');

const getAllApps = async (req, res, next) => {
  connect();

  const doc = await Application.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
};

const createApp = async (req, res) => {
  await dbConnect();
  try {
    const s3 = new aws.S3({
      credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_HIDDEN_KEY,
      },
      region: process.env.AWS_AREA,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `resumes/${req.body.name}-${req.body.email}.pdf`,
      Body: req.file.buffer,
      ACL: 'public-read',
    };

    await s3.upload(params, async (err, data) => {
      try {
        if (err) {
          console.error(err);
        } else if (data) {
          const resume = data.Location;
          await Application.create({
            ...req.body,
            resume,
          });

          await sendEmail({ name: req.body.name, email: req.body.email });
        }

        res.status(201).json({
          status: 'success',
          msg: 'Your document has been created successfully',
        });
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Upload Error', data: err });
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
});
handler.get(getAllApps);
handler.use(uploadResume);
handler.post(createApp);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
