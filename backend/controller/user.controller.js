import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, sendPasswordResetEmail } from "../utils/email.utils.js";
import { sendWelcomeEmail } from "../utils/welcomeEmail.utils.js";

export const register = async (req, res) => {
  const { name, email, password, state } = req.body;
  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      state,
    });

    await newUser.save();

    // Send welcome email BEFORE sending response
    let emailSent = true;
    try {
      await sendWelcomeEmail(newUser.email, newUser.name);
    } catch (err) {
      console.error("Email sending failed:", err);
      emailSent = false;
      // Continue even if email fails - don't block registration
    }

    // Send single response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        state: newUser.state,
      },
      emailSent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message, // Only include in development environment
    });
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
    const resetlink = `https://cli-map.vercel.app/reset-password/${resetToken}`;

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
  console.log("Received request with token:", token); // Log the token
  if (!token || !newPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      console.log("User not found for token:", token); // Log if user is not found
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log("Password reset successful for user:", user.email); // Log success
    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error during password reset:", err); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
};
