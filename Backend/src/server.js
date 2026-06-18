import express from "express";
import "dotenv/config";
import ConnectDatabase from "./Database/db.js";
import userRoute from "./Routes/user.route.js";
import productRoute from "./Routes/product.route.js"
import cartRoute from "./Routes/cart.route.js"
import orderRoute from "./Routes/order.route.js"
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
// fixing the route
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);


app.listen(PORT, () => {
  ConnectDatabase();
  console.log(`server listening at port:${PORT}`);
});
