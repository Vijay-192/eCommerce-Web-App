import { ShoppingCart, Plus } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { API_URL_CART } from "@/api/api";

const ProductCard = ({ product, loading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        `${API_URL_CART}/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Product added to cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <div className="border-[4px] border-black bg-white relative overflow-hidden rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Price Badge Skeleton */}
        <div className="absolute top-4 right-4 bg-gray-200 border-[3px] border-black px-3 py-2 rounded-[22px] z-10 w-20 h-10 animate-pulse" />

        {/* Image Skeleton */}
        <div className="w-full aspect-square border-b-[4px] border-black bg-gray-200 animate-pulse" />

        {/* Text Skeleton */}
        <div className="p-6 bg-white space-y-3 flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  const { productImg, productPrice, productName } = product;

  return (
    <div
      className="border-[4px] border-black bg-white transition-all duration-200 relative overflow-hidden rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Price Badge - Top Right Corner */}
      <div className="absolute top-4 right-4 bg-lime-300 border-[3px] border-black px-3 py-2 rounded-[22px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
        <h2 className="font-black text-lg flex items-center gap-1">
          ₹{productPrice.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Image Container */}
      <div className="w-full aspect-square overflow-hidden relative border-b-[4px] border-black">
        {/* First Image */}
        <img
          src={productImg[0]?.url}
          alt={productName}
          className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"
            }`}
        />

        {/* Second Image - Hover State */}
        <img
          src={productImg[1]?.url || productImg[0]?.url}
          alt={productName}
          className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Hover Overlay with Buttons */}
        <div
          className={`absolute bottom-0 left-0 right-0 flex gap-3 p-4 transition-all duration-200 ${isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
            }`}
        >
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="flex-1 cursor-pointer bg-cyan-400 hover:bg-cyan-300 text-black font-bold tracking-wide uppercase text-sm px-6 py-4 border-[3px] border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 flex items-center justify-center gap-2"
          >
            VIEW <Plus size={18} strokeWidth={3} />
          </button>

          <button
            onClick={() => addToCart(product._id)}
            className="cursor-pointer bg-pink-400 hover:bg-pink-300 text-black p-4 border-[3px] border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
          >
            <ShoppingCart size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white text-center space-y-3">
        <h1 className="font-bold text-base leading-snug line-clamp-2 uppercase">
          {productName}
        </h1>
      </div>
    </div>
  );
};

export default ProductCard;