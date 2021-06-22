import multer from 'multer';
import nextConnect from 'next-connect';

import Menu from '../../../../../models/menuModel';
import dbConnect from '../../../../../util/mongodb';

const connect = async () => await dbConnect();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/menus',
    filename: (req, file, cb) => cb(null, `menu-${Date.now()}.pdf`),
  }),
});

const uploadMenu = upload.single('menu');

const createMenu = async (req, res) => {
  try {
    connect();
    const doc = await Menu.create({
      ...req.body,
      fileName: req.file.filename,
    });

    res.status(201).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'Error', data: err });
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
