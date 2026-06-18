import express from "express"; // changse
import { isAuthenticated } from "../Middlewares/isAuth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../Controllers/cart.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getCart);

router.post("/add", isAuthenticated, addToCart);

router.put("/update", isAuthenticated, updateQuantity);

router.delete("/remove", isAuthenticated, removeFromCart);

export default router;
