import multer from 'multer';
import nextConnect from 'next-connect';

import Application from '../../../../../models/applicationModel';
import AppError from '../../../../../util/appError';
import dbConnect from '../../../../../util/mongodb';
import Email from '../../../../../util/email';
import { identity } from 'lodash';

const connect = async () => await dbConnect();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/resumes',
    filename: (req, file, cb) => cb(null, `resume-${Date.now()}.pdf`),
  }),
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
    const doc = await Application.create({
      ...req.body,
      resume: req.file.filename,
    });

    const adminPortal = `${req.protocol}://${req.rawHeaders[1]}/admin`; //TODO: UPDATE FOR PRODUCTION
    const applicationPage = `${req.protocol}://${req.rawHeaders[1]}/jobs`; // TODO: UPDATE FOR PRODUCTION
    const kev = {
      name: 'Kevin Dexter',
      email: 'isaacj1996@gmail.com', // TODO: UPDATE
    };

    await new Email(doc, applicationPage).sendApplicationConfirmation();
    await new Email(kev, adminPortal).sendApplicationNotification();
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'error', data: err });
  }
};

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
    const id = req.body.id;
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
handler.get(getAllApps);
handler.use(uploadResume);
handler.post(createApp);
handler.patch('/:id', updateApp);
handler.delete(deleteApp);

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
