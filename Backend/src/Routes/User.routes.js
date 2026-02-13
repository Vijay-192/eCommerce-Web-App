import express from "express";
import { login,  logout,  register, reVerify, Verify } from "../Controllers/User.Controller.js";
import { isAuthenticated } from "../Middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", Verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout",isAuthenticated, logout);

export default router;
