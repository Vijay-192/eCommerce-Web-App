import express from "express";
import { isAuthenticated } from "../Middlewares/isAuth.js";
import {
    createOrder,
    verifyPayment,
} from "../Controllers/Order.Controller.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);


export default router;