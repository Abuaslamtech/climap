import mongoose from "mongoose";
import { states } from "../utils/states.js";

const facilitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: [3, "Name must be atleast 3 characters"],
      maxlength: [50, "Name must not exceed 50 characters"],
      index: true,
    },
    state_name: { type: String, required: true, trim: true, enum: states },
    lga_name: { type: String, required: true, trim: true },
    lga_code: { type: String, trim: true },
    state_code: { type: String, trim: true },
    category: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Primary", "Secondary", "Tertiary"],
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    registeredBy: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "User",
    },
  },
  { timestamps: true }
);

const Facilities = mongoose.model("Facilities", facilitiesSchema);

export default Facilities;
