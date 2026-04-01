import express from "express"; // changse
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../Controllers/product.controller.js";
import { isAdmin, isAuthenticated } from "../Middlewares/isAuth.js";
import { multipleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, multipleUpload, addProduct);

router.get("/getallproducts", getAllProduct);

router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct
);

export default router;
