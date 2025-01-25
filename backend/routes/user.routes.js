import express, { Router } from "express";
import {
  register,
  login,
  sendResetLink,
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendResetLink", sendResetLink);

export default router;
