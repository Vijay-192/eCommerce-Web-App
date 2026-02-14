import express from "express";
import { changePassword, forgotPassword, login,  logout,  register, reVerify, Verify, VerifyOTP } from "../Controllers/User.Controller.js";
import { isAuthenticated } from "../Middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", Verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout",isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", VerifyOTP);
router.post("/change-password/:email", changePassword);

export default router;
