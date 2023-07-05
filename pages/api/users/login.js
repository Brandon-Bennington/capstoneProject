import jwt from 'jsonwebtoken';
import { comparePasswords } from '../../lib/usersHelper';
import User from '../../lib/User';

export default async function handler(req, res) {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      throw { status: 404, message: 'User Not Found' };
    }

    let checkedPassword = await comparePasswords(req.body.password, foundUser.password);
    if (!checkedPassword) {
      throw { status: 401, message: 'Invalid Password' };
    }

    let payload = {
      id: foundUser._id,
      email: foundUser.email,
    };

    let token = jwt.sign(payload, process.env.SUPER_SECRET_KEY, { expiresIn: 60 * 60 });

    res.status(200).json({
      email: req.body.email,
      message: 'Successful Login!!',
      token: token,
    });
  } catch (error) {
    res.status(error.status).json(error.message);
  }
}

