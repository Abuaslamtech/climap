import express, { Router } from "express";
import {
  add,
  modify,
  remove,
  retrieve,
} from "../controller/facilities.controller.js";
import { addBulk } from "../controller/facilitiesBulk.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
const router = Router();

// routes
router.get("/retrieve", retrieve);
router.post("/add", authenticateUser, add);
router.post("/addBulk", authenticateUser, addBulk);
router.get("/modify", modify);
router.get("/remove", remove);
export default router;
