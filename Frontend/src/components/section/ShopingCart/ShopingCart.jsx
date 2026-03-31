import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import animation from "../../../assets/svg/arrow.svg";
import ShopingEmptyCart from "./ShopingEmptyCart";
import { Button } from "@/components/retroui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { API_URL_CART } from "@/api/api";
function ShopingCart() {
  const { cart } = useSelector(store => store.product);
  const navigate = useNavigate();
  const sub_total = cart?.totalPrice || 0;
  const shipping_price = sub_total > 299 ? 0 : 10;
  const tax = sub_total * 0.05; // 5%
  const dispatch = useDispatch();
  const total = sub_total + shipping_price + tax;
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(API_URL_CART, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) { }
  };
  const handleupdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Response:", res.data); // <-- yeh add karo
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async productId => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product remove from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);
  return (
    <div className="pt-12 h-screen  split-bg ">
      {cart?.items?.length > 0 ? (
        <div className="max-w-8xl mx-auto px-6 h-[86.5vh]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
            {/* ================= LEFT SIDE (Scrollable Cart Items) ================= */}
            <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto pr-2 h-[70vh]">
              {cart?.items?.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 
                  bg-gray-200 border-4 border-black 
                  p-5 shadow-[8px_8px_0px_0px_black]"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 shrink-0">
                    <img
                      src={
                        product?.productId?.productImg?.[0]?.url || animation
                      }
                      className="w-full h-full object-cover rounded-xl border-2 border-black"
                      alt="product"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[18px] font-bold truncate max-w-[220px]">
                      {product?.productId?.productName}
                    </h2>

                    <p className="mt-2 inline-block bg-[#C4D96F] px-3 py-1 border-2 rounded-[12px] border-black font-semibold">
                      Brand: {product?.productId?.brand}
                    </p>

                    <p className="mt-3 text-lg font-extrabold">
                      ₹{product?.price?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Quantity Section */}
                  <div className="flex flex-col items-center gap-3 pt-7">
                    <div className="flex items-center border-4 border-black shadow-[4px_4px_0px_0px_black]">
                      <button
                        onClick={() =>
                          handleupdateQuantity(
                            product.productId._id,
                            "decrease"
                          )
                        }
                        className="px-4 py-2 border-r-4 border-black"
                      >
                        -
                      </button>

                      <span className="px-6 py-2 font-bold text-lg">
                        {product.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleupdateQuantity(
                            product.productId._id,
                            "increase"
                          )
                        }
                        className="px-4 py-2 border-l-4 border-black"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-sm font-bold">
                      Subtotal: ₹
                      {(product?.price * product?.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleRemove(product?.productId?._id)}
                    className="bg-[#F59A3D] border-4 border-black 
                    px-4 py-3 shadow-[4px_4px_0px_0px_black]
                    hover:translate-x-1 hover:translate-y-1
                    hover:shadow-[2px_2px_0px_0px_black]
                    transition-all duration-150"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* ================= RIGHT SIDE (Sticky Order Summary) ================= */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-28 
                bg-white border-4 border-black 
                p-6 shadow-[8px_8px_0px_0px_black]"
              >
                <h1 className="text-2xl font-extrabold mb-6">Order Summary</h1>

                <div className="flex justify-between mb-4 font-semibold">
                  <span>Subtotal</span>
                  <span>₹{sub_total.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between mb-4 font-semibold">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-4 font-semibold">
                  <span>Shipping</span>
                  <span>₹{shipping_price}</span>
                </div>

                <hr className="border-2 border-black my-4" />

                <div className="flex justify-between text-xl font-extrabold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                {/* Promo Code */}
                <div className="flex gap-3 mt-6">
                  <input
                    placeholder="Promo code"
                    className="flex-1 border-4 border-black px-3 py-2 font-bold"
                  />
                  <Button>Apply</Button>
                </div>

                {/* place order */}
                <div className="flex flex-col items-center gap-4 mt-6">
                  <Button
                    onClick={() => navigate("/address")}
                    className="w-full bg-orange-400 border-4 border-black 
    py-3 font-bold uppercase text-center
    transition-all duration-150 
    flex items-center justify-center"
                  >
                    Place Order
                  </Button>
                  {/*  Continue to Shopping */}
                  <Button
                    variant="link"
                    className="text-center font-semibold"
                    onClick={() => navigate("/collection")}
                  >
                    Continue to Shopping
                  </Button>
                </div>
                {/* ================= INFO NOTES ================= */}
                <div className="mt-6 text-sm border-t-2 border-black pt-4 space-y-1 text-gray-600">
                  <p>✔ Free shipping on orders over ₹299</p>
                  <p>✔ 30-day return policy</p>
                  <p>✔ Secure checkout with SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-15 h-[77.3vh]">
          <ShopingEmptyCart />
        </div>
      )}
    </div>
  );
}

export default ShopingCart;
