import bcrypt from 'bcryptjs';
import User from '../../lib/User';

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw { status: 409, message: 'User already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      userObj: savedUser,
      message: 'Registration successful',
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || 'Internal server error',
    });
  }
}
