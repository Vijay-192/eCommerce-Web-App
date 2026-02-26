import React from "react";
import { useSelector } from "react-redux";
import animation from "../../../assets/svg/arrow.svg";

function ShopingCart() {
  const { cart } = useSelector(store => store.product);

  const handleIncrease = item => {
    console.log("Increase", item);
    // dispatch increase action here
  };

  const handleDecrease = item => {
    console.log("Decrease", item);
    // dispatch decrease action here
  };

  const handleDelete = item => {
    console.log("Delete", item);
    // dispatch delete action here
  };

  return (
    <div className="pt-24 min-h-screen split-bg">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-6">
          {/* 🔥 Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ================= LEFT SIDE (Cart Items) ================= */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart?.items?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-6 
                bg-gray-200 border-4 border-black 
                p-5 shadow-[8px_8px_0px_0px_black]"
                  >
                    {/* Product Image */}
                    <div className="w-32 h-32 shrink-0">
                      <img
                        src={item?.productId?.productImg?.[0]?.url || animation}
                        className="w-full h-full object-cover rounded-xl border-2 border-black"
                        alt="product"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[18px] font-bold truncate max-w-[220px]">
                        {item?.productId?.productName}
                      </h2>

                      <p className="mt-2 inline-block bg-[#C4D96F] px-3 py-1 border-2 rounded-[12px] border-black font-semibold">
                        Brand: {item?.productId?.brand}
                      </p>

                      <p className="mt-3 text-lg font-extrabold">
                        ₹{item?.price?.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col items-center gap-3 pt-7">
                      <div className="flex items-center border-4 border-black shadow-[4px_4px_0px_0px_black]">
                        <button
                          onClick={() => handleDecrease(item)}
                          className="px-4 py-2 border-r-4 border-black"
                        >
                          -
                        </button>

                        <span className="px-6 py-2 font-bold text-lg">
                          {item?.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrease(item)}
                          className="px-4 py-2 border-l-4 border-black"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm font-bold">
                        Subtotal: ₹
                        {(item?.price * item?.quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-[#F59A3D] border-4 border-black 
                  px-4 py-3 shadow-[4px_4px_0px_0px_black]
                  hover:translate-x-1 hover:translate-y-1
                  hover:shadow-[2px_2px_0px_0px_black]
                  transition-all duration-150"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ================= RIGHT SIDE (Order Summary) ================= */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-28 
            bg-white border-4 border-black 
            p-6 shadow-[8px_8px_0px_0px_black]"
              >
                <h1 className="text-2xl font-extrabold mb-6">Order Summary</h1>

                <div className="flex justify-between mb-4 font-semibold">
                  <span>Subtotal</span>
                  <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between mb-4 font-semibold">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <hr className="border-2 border-black my-4" />

                <div className="flex justify-between text-xl font-extrabold">
                  <span>Total</span>
                  <span>₹{cart?.totalPrice?.toLocaleString("en-IN")}</span>
                </div>

                <button
                  className="mt-6 w-full bg-orange-400 border-4 border-black 
              py-3 font-bold shadow-[4px_4px_0px_0px_black]
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[2px_2px_0px_0px_black]
              transition-all duration-150"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div
            className="bg-red-300 border-4 border-black 
      px-8 py-4 text-2xl font-bold shadow-[6px_6px_0px_0px_black]"
          >
            Cart is Empty!
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopingCart;
