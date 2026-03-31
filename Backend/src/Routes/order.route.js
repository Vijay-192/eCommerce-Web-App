import express from "express";
import { isAuthenticated } from "../Middlewares/isAuth.js";
import {
    createOrder,
    getMyOrder,
    verifyPayment,
} from "../Controllers/Order.Controller.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);
router.post("/myorder", isAuthenticated, getMyOrder);


export default router;