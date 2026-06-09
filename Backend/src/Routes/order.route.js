import express from "express"; // changse
import { isAuthenticated } from "../Middlewares/isAuth.js";
import {
    createOrder,
    getMyOrder,
    verifyPayment,
} from "../Controllers/order.controller.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);
router.get("/myorder", isAuthenticated, getMyOrder);


export default router;