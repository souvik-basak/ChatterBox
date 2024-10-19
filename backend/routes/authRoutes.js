import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

// login
router.post('/login',login)
// signup
router.post('/signup',signup)
// logout
router.post('/logout',logout)

export default router;