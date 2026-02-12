import express from "express";
import "dotenv/config";
import ConnectDatabase from "./Database/db.js";
import userRoute from "./Routes/User.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/user", userRoute);

//     http://localhost:5000/api/v1/user/register
app.listen(PORT, () => {
  ConnectDatabase();
  console.log(`server listening at port:${PORT}`);
});
