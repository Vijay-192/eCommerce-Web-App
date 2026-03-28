import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

function OrderSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center split-bg px-4">

            <div className="w-full max-w-2xl bg-slate-500 border-4 border-black rounded-2xl shadow-lg p-8">

                {/* Top Section */}
                <div className="flex flex-col items-center text-center">

                    {/* success */}
                    <div className="mb-4">
                        <CheckCircle className="text-green-400 h-16 w-16" />
                    </div>

                    {/* title */}
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            Order Placed Successfully
                        </h1>

                        {/* message */}
                        <p className="text-slate-500 text-sm mt-2">
                            Thank you for your order! Your order has been placed successfully.
                        </p>

                        {/* btn */}
                        <div className="flex gap-4 mt-6 justify-center flex-wrap">

                            {/* Continue Shopping (Secondary) */}
                            <button
                                onClick={() => navigate("/collection")}
                                className="cursor-pointer px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium 
    hover:bg-slate-100 hover:border-slate-400 
    transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Continue Shopping
                            </button>

                            {/* View Order (Primary CTA) */}
                            <button
                                onClick={() => navigate("/orders")}
                                className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold 
    hover:from-orange-600 hover:to-amber-600 
    transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
                            >
                                View Order
                            </button>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default OrderSuccess;