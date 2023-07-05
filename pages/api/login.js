import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { email, password } = req.body;

  const { db } = await connectToDatabase();
  const collection = db.collection('users');

  const user = await collection.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // If password matches, the user is authenticated.
  // You could generate a token and return it to the user here

  res.status(200).json({ message: 'Logged in successfully' });
}
