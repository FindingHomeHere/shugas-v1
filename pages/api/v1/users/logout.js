import nextConnect from 'next-connect';
import { serialize } from 'cookie';

const logout = (req, res) => {
  const cookieOptions = {
    expires: new Date(Date.now() - 1000),
    httpOnly: true,
  };
  res.setHeader('Set-Cookie', serialize(null, cookieOptions));
  res.status(200).json({ status: 'success' });
};

const onError = (err, req, res, next) => {
  console.error('SERVER ERROR', err);
  next();
};

const handler = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' not allowed.` });
  },
  onError,
}).get(logout);

export default handler;
