import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // compare passwords
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    // generate JWT token
    const token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

    // send token
    res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    console.log({ loginerror: err });
    res.status(500).json({ error: "Internal server error" });
  }
};
