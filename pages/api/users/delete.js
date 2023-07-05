// pages/api/users/delete.js
import jwt from 'jsonwebtoken';
import User from '../../lib/User';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY);
    let deletedUser = await User.findByIdAndDelete(decoded.id);

    if (!deletedUser) {
      throw {
        status: 404,
        message: "User not found"
      };
    }

    res.status(200).send(true);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}
