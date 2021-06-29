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
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: process.env.AWS_REGION,
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `menus/${Date.now()}-${req.file.originalname}`,
      Body: req.file.buffer,
      ACL: 'public-read'
    }
    
    const post = await s3.upload(params, async (err, data) => {
      try {
        if (err) {
          console.log(err)
        } else if(data) {
          const fileName = data.Location
          await Menu.create({
            ...req.body,
            fileName,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })
    
    res.status(201).json({
      status: 'success',
      data: {
        data: {
          post
        },
      }
    })
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

// import multer from 'multer';
// import AppError from '../../../../../util/appError';
// import Menu from '../../../../../models/menuModel';
// import dbConnect from '../../../../../util/mongodb';

// export default async function handler(req, res) {
//   const { method } = req;

//   await dbConnect();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, '/uploads/menus');
//     } else {
//       cb(
//         new AppError("Make sure your file is a PDF, or it won't work.", 400),
//         false
//       );
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, `menu-${Date.now()}.pdf`);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// const uploadMenu = upload.single('menu');

//   switch (method) {
//     case 'GET':
//   try {
//     const menus = await Menu.find();
//     res.status(200).json({
//       status: 'Success',
//       data: menus,
//     });
//   } catch (err) {
//     res.status(400).json({ status: 'Error', data: err });
//   }
//   break;
// case 'POST':
//   try {
//     uploadMenu();
//     const doc = await Menu.create({
//       ...req.body,
//       fileName: req.file.filename,
//     });

//     res.status(201).json({
//       status: 'Success',
//       data: doc,
//     });
//   } catch (err) {
//     res.status(400).json({ status: 'Error', data: err });
//   }
//   }
// }
