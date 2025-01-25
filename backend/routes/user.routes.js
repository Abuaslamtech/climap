import express, { Router } from "express";
import {
  register,
  login,
  sendResetLink,
  resetPassword,
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendResetLink", sendResetLink);
router.post("/resetPassword", resetPassword);

export default router;
