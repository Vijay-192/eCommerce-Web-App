import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function ProductViewModal({ product, onClose }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black w-[800px] max-h-[90vh] flex flex-col shadow-[6px_6px_0px_black]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b-2 border-black bg-white">
          <h2 className="text-xl font-bold">Product Details</h2>

          <button
            onClick={onClose}
            className="border-2 border-black px-2 py-1 bg-[#F59A3D]"
          >
            X
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Main Image */}
          <Zoom>
            <img
              src={product?.productImg?.[activeImage]?.url}
              alt=""
              className="w-full h-[350px] object-contain border-2 border-black mb-4"
            />
          </Zoom>

          {/* Thumbnails */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {product?.productImg?.map((img, i) => (
              <img
                key={i}
                src={img?.url}
                alt=""
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 object-contain border-2 cursor-pointer ${
                  activeImage === i ? "border-blue-500" : "border-black"
                }`}
              />
            ))}
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="">
              <h1 className="text-3xl font-bold">Name</h1>
              
               <span className="text-xl font-semibold"> {product?.productName}</span> 
            </div>
         
            <div className="space-y-2 ">
              <span className="text-md font-semibold">Category:</span> {product?.category}
            </div>
            <div className="space-y-2">
              <span className="text-md font-semibold">Brand:</span> {product?.brand}
            </div>
            <div className="space-y-2"> 
              <span className="text-md font-semibold">Price:</span> ₹{product?.productPrice}
            </div>
               <div className="py-7 ">
              <h1 className="text-2xl font-bold">Description:</h1> <span className=" font-semibold"> {product?.productDesc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductViewModal;
