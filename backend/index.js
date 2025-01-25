import express from "express";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import facilitiesRoutes from "./routes/facilities.routes.js";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// connect database
connectDB();

// middleware
app.use(express.json({ limit: "100mb" }));
app.use(cors());

// routes
app.use("/api/users/", userRoutes);
app.use("/api/facilities/", facilitiesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
