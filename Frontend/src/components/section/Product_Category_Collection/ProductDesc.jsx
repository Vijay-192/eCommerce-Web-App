import { Button } from "@/components/retroui/Button";

import { setCart } from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function ProductDesc({ product }) {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
   const API_BASE_URL = import.meta.env.VITE_API_URL_CART;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(product.productPrice);

  const addToCart = async () => {
    if (!accessToken) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE_URL}/add`,
        { productId: product._id, quantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Product added to cart ");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-10">
      {/* Title */}
      <h1 className="font-bold text-4xl text-gray-800   line-clamp-3">
        {product.productName}
      </h1>

      {/* Category + Brand */}
      <p className="text-gray-600 text-sm">
        {product.category} | {product.brand}
      </p>

      {/* Price */}
      <h2 className="text-3xl font-semibold">{formattedPrice}</h2>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed line-clamp-12">
        {product.productDesc}
      </p>

      {/* Quantity + Button in One Line */}
      <div className="flex items-center gap-4 mt-4">
        {/* <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-700">Qty:</p>
          <Input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-16 text-center"
          />
        </div> */}
        <div className="flex items-center gap-4 mt-4">
          <p className="font-semibold text-gray-700">Qty:</p>

          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm  bg-[#F59A3D]">
            {/* Decrease Button */}
            <button
              onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
              className="px-3 py-1"
            >
              −
            </button>

            {/* Quantity Display */}
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-10 h-10 text-center outline-none "
            />

            {/* Increase Button */}
            <button
              onClick={() => setQuantity(prev => prev + 1)}
              className="px-3 py-1"
            >
              +
            </button>
          </div>
        </div>
        <Button
          onClick={addToCart}
          disabled={loading}
          className="px-6 py-2 mt-3 h-10"
        >
          {loading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}

export default ProductDesc;
