import express from "express";
import { register, reVerify, Verify } from "../Controllers/User.Controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", Verify);
router.post("/reverify", reVerify);

export default router;
