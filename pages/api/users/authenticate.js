// pages/api/users/authenticate.js
import jwt from 'jsonwebtoken';
import User from '../../lib/User';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SUPER_SECRET_KEY);
    let foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      throw {
        status: 404,
        message: "User not found"
      };
    }

    res.status(200).json({
      username: foundUser.username,
      email: foundUser.email,
      message: "Successful Token Login!!"
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}
