import express from "express";
import "dotenv/config";
import ConnectDatabase from "./Database/db.js";
import userRoute from "./Routes/User.route.js";
import productRoute from "./Routes/Product.route.js"
import cartRoute from "./Routes/Cart.route.js"
import orderRoute from "./Routes/Order.route.js"
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product",productRoute );
app.use("/api/v1/cart",cartRoute );
app.use("/api/v1/order",orderRoute );

//     http://localhost:5000/api/v1/user/register

app.listen(PORT, () => {
  ConnectDatabase();
  console.log(`server listening at port:${PORT}`);
});
