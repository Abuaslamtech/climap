import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, sendPasswordResetEmail } from "../utils/email.utils.js";

// registration logic
export const register = async (req, res) => {
  const { name, email, password, state } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "User already exist" });
    }

    //   hass password
    const hashedPassword = await bcrypt.hash(password, 10);

    //   save user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      state,
    });
    await newUser.save();
    res
      .status(201)
      .location(`users/${newUser._id}`)
      .json({
        message: "User registered succesfully",
        user: {
          name: newUser.name,
          email: newUser.email,
          state: newUser.state,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// login logic
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("User found:", !!user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // compare passwords
    const verifyPassword = await bcrypt.compare(password, user.password);
    console.log("Password verified: ", verifyPassword);
    if (!verifyPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    // generate JWT token
    const token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // send token
    res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    console.log("loginerror: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// send reset password link logic
export const sendResetLink = async (req, res) => {
  // Add input validation
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // generate token
    const resetToken = generateToken();
    // store reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // construct reset link
    const resetlink = `https://cli-map-vercel.app/reset-password/${resetToken}`;

    // send email
    const emailResult = await sendPasswordResetEmail(email, resetlink);
    console.log(emailResult);

    if (emailResult) {
      return res.status(200).json({ message: "Email sent successfully" });
    } else {
      res.status(500).json({ message: "Failed to send Email" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// reset the password link
export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
