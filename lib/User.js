import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"],
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
