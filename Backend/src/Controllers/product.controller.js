import cloudinary from "../Utils/cloudinary.js";
import getDataUri from "../Utils/dataUri.js";
import { Product } from "../Models/product.model.js"; // changse

export const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.userId;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Multiple images handle
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "ecommerce_mern_products",
        });
        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Create product in database
    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productPrice,
      category,
      brand,
      productImg,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllProduct = async (_, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No product available",
        products: [],
      });
    }

    // if block ke baahir hona chahiye
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }
    // delete img from cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }
    // delete product from database
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      ProductName,
      ProductDesc,
      ProductPrice,
      Category,
      Brand,
      existingImages,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let updateImages = [];

    if (existingImages) {
      const keepIds = JSON.parse(existingImages);
      updateImages = product.productImg.filter(img =>
        keepIds.includes(img.public_id)
      );
      const removedImages = product.productImg.filter(
        img => !keepIds.includes(img.public_id)
      );
      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updateImages = product.productImg;
    }

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "ecommerce_mern_products",
        });
        updateImages.push({ url: result.secure_url, public_id: result.public_id });
      }
    }


    product.productName = ProductName || product.productName;
    product.productDesc = ProductDesc || product.productDesc;
    product.productPrice = ProductPrice || product.productPrice;
    product.category = Category || product.category;
    product.brand = Brand || product.brand;
    product.productImg = updateImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error.message); // helpful for future debug
    return res.status(500).json({ success: false, message: error.message });
  }
};