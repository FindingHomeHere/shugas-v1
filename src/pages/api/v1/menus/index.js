import multer from 'multer';
import nextConnect from 'next-connect';
import aws from 'aws-sdk';

import Menu from '../../../../../models/menuModel';
import dbConnect from '../../../../../util/mongodb';

const connect = async () => await dbConnect();

const upload = multer({
  storage: multer.memoryStorage(),
});

const uploadMenu = upload.single('menu');

const createMenu = async (req, res) => {
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
      Key: `menus/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: 'public-read',
    };

    const post = s3.upload(params, async (err, data) => {
      try {
        const fileName = data.Location;
        const doc = await Menu.create({
          ...req.body,
          fileName: fileName,
        });

        res.status(201).json({
          status: 'success',
          data: {
            doc,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'Menu Upload Error', data: err });
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
})
  .use(uploadMenu)
  .post(createMenu);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
