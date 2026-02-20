import express from "express";
import {
  allUser,
  changePassword,
  forgotPassword,
  getUserById,
  login,
  logout,
  register,
  reVerify,
  updateUser,
  Verify,
  VerifyOTP,
} from "../Controllers/User.Controller.js";
import { isAdmin, isAuthenticated } from "../Middlewares/isAuth.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", Verify);
router.post("/reverify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp/:email", VerifyOTP);
router.post("/change-password/:email", changePassword);
router.get("/all-user", isAuthenticated, isAdmin, allUser);
router.get("/get-user/:userId", getUserById);
router.put("/update/:id", isAuthenticated, singleUpload, updateUser);

export default router;
