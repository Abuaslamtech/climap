import jwt from "jsonwebtoken"; // Add this import at the top of the file

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access Denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Verification error details:", err);
    res.status(401).json({
      message: "Token invalid, access denied",
      error: err.message,
    });
  }
};
