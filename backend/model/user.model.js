import mongoose from "mongoose";
import { states } from "../utils/states.js";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Must be atleast 3 characters"],
      maxlength: [50, "Must not exceed 50 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Must be atleast 8 characters"],
    },
    state: { type: String, required: true, trim: true, enum: states },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },

  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
