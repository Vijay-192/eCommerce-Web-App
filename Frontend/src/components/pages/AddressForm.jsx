
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function AddressForm() {
    const { cart, addresses, selectedAddress } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const API_BASE_URL = import.meta.env.VITE_API_URL_ORDER;

    const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(addAddress(formData));
        setShowForm(false);
    };

    const subtotal = cart.totalPrice;
    const shipping = subtotal > 500 ? 0 : 49;
    const tax = parseFloat((subtotal * 0.05).toFixed(2));
    const total = subtotal + shipping + tax;

    const handlePayment = async () => {
        const accessToken = localStorage.getItem("accessToken");

        try {
            const res = await axios.post(`${API_BASE_URL}/create-order`, {
                products: cart?.items?.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                tax,
                shipping,
                amount: total,
                currency: "INR",
            }, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            const data = res.data;

            if (!data.success) {
                toast.error("Failed to create order");
                return;
            }

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                order_id: data.order.id,
                name: "E-Commerce",
                description: "Order Payment",
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(
                            `${API_BASE_URL}/verify-payment`,
                            response,
                            { headers: { Authorization: `Bearer ${accessToken}` } }
                        );
                        if (verifyRes.data.success) {
                            toast.success("Payment verified successfully");
                            dispatch(setCart({ items: [], totalPrice: 0 }));
                            navigate("/order-success");
                        } else {
                            toast.error("Failed to verify payment");
                        }
                    } catch (error) {
                        toast.error("Error verifying payment");
                    }
                },
                modal: {
                    ondismiss: async function () {
                        await axios.post(
                            `${API_BASE_URL}/verify-payment`,
                            { razorpay_order_id: data.order.id, paymentFailed: true },
                            { headers: { Authorization: `Bearer ${accessToken}` } }
                        );
                        toast.error("Payment cancelled.");
                    },
                },
                prefill: {
                    name: addresses[selectedAddress]?.fullName || formData.fullName,
                    email: addresses[selectedAddress]?.email || formData.email,
                    contact: addresses[selectedAddress]?.phone || formData.phone,
                },
                notes: {
                    address: addresses[selectedAddress]?.address || formData.address,
                },
                theme: { color: "#333333" },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", async function () {
                await axios.post(
                    `${API_BASE_URL}/verify-payment`,
                    { razorpay_order_id: data.order.id, paymentFailed: true },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                toast.error("Payment failed. Please try again.");
            });
            rzp.open();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen split-bg flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 mr-22 md:grid-cols-2 gap-6">

                    {/* LEFT PANEL */}
                    <div className="bg-white border-4 border-black rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0px_black] space-y-4 w-full">
                        {showForm ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold">Add Address</h2>
                                <div className="space-y-3">
                                    <div>
                                        <label htmlFor="fullName">Full Name</label>
                                        <input
                                            type="text" name="fullName" id="fullName"
                                            value={formData.fullName} onChange={handleChange}
                                            placeholder="e.g. full name"
                                            className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email" name="email" id="email"
                                            value={formData.email} onChange={handleChange}
                                            placeholder="e.g. email@gmail.com"
                                            className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel" name="phone" id="phone"
                                            value={formData.phone} onChange={handleChange}
                                            placeholder="e.g. 10-digit number"
                                            className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="address">Address</label>
                                        <input
                                            type="text" name="address" id="address"
                                            value={formData.address} onChange={handleChange}
                                            placeholder="House no, street, area"
                                            className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="city">City</label>
                                            <input
                                                type="text" name="city" id="city"
                                                value={formData.city} onChange={handleChange}
                                                placeholder="e.g. city"
                                                className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="state">State</label>
                                            <input
                                                type="text" name="state" id="state"
                                                value={formData.state} onChange={handleChange}
                                                placeholder="e.g. state"
                                                className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                type="text" name="zipcode" id="zipcode"
                                                value={formData.zipcode} onChange={handleChange}
                                                placeholder="e.g. zipcode"
                                                className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="country">Country</label>
                                            <input
                                                type="text" name="country" id="country"
                                                value={formData.country} onChange={handleChange}
                                                placeholder="e.g. country"
                                                className="h-10 rounded-lg border-2 border-black text-sm w-full px-2 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSave}
                                    className="mt-5 cursor-pointer w-full border-2 border-black bg-[#C4D96F] text-black py-3 rounded-lg font-semibold shadow-[4px_4px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none transition hover:bg-[#F59A3D]"
                                >
                                    Save & Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl sm:text-2xl font-bold">Saved Addresses</h2>
                                <div className="max-h-64 sm:max-h-72 overflow-y-auto space-y-3 pr-1">
                                    {addresses.map((addr, index) => {
                                        const isSelected = selectedAddress === index;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => dispatch(setSelectedAddress(index))}
                                                className={`cursor-pointer p-4 rounded-xl border-2 border-black transition w-full ${
                                                    isSelected
                                                        ? "bg-[#C4D96F] shadow-[4px_4px_0px_black]"
                                                        : "bg-white hover:shadow-[4px_4px_0px_black]"
                                                }`}
                                            >
                                                <p className="font-semibold text-sm sm:text-base">{addr.fullName}</p>
                                                <p className="text-xs">{addr.phone}</p>
                                                <p className="text-xs">{addr.email}</p>
                                                <p className="text-xs">{addr.address}, {addr.city}</p>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setDeleteIndex(index);
                                                    }}
                                                    className="mt-2 text-xs border border-black px-2 py-1 hover:bg-black hover:text-white transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full border-2 border-black py-2 rounded-lg hover:bg-[#F59A3D] transition"
                                >
                                    + Add New Address
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="w-full border-2 border-black py-3 rounded-lg bg-black text-white hover:bg-[#F59A3D] hover:text-black transition"
                                >
                                    Proceed to Checkout
                                </button>
                            </>
                        )}
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="w-full h-full ml-22">
                        <div className="w-full h-full bg-white border-4 border-black rounded-2xl p-4 sm:p-6 shadow-[6px_6px_0px_black] flex flex-col justify-between">
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold mb-4 border-b-2 border-black pb-2">
                                    Order Summary
                                </h1>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-xl">Subtotal ({cart.items.length}) items</span>
                                        <span className="font-medium">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                                            {shipping === 0 ? "Free" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tax (5%)</span>
                                        <span className="font-medium">₹{tax}</span>
                                    </div>
                                    <div className="border-t-2 border-black pt-3 mt-2 flex justify-between items-center font-bold text-base">
                                        <span>Total</span>
                                        <span className="text-lg">₹{total}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-sm pt-4 space-y-1 text-gray-600">
                                <p>✔ Free shipping on orders over ₹500</p>
                                <p>✔ 30-day return policy</p>
                                <p>✔ Secure checkout with SSL encryption</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* DELETE MODAL */}
            {deleteIndex !== null && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
                    <div className="bg-white border-2 border-black p-5 sm:p-6 rounded-xl shadow-[6px_6px_0px_black] text-center w-full max-w-xs">
                        <h3 className="font-bold text-lg">Delete Address?</h3>
                        <p className="text-sm mt-2">This cannot be undone.</p>
                        <div className="flex gap-3 mt-4 justify-center flex-wrap">
                            <button
                                onClick={() => setDeleteIndex(null)}
                                className="border-2 border-black px-4 py-2 text-sm hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(deleteAddress(deleteIndex));
                                    setDeleteIndex(null);
                                }}
                                className="border-2 border-black bg-[#F59A3D] px-4 py-2 text-sm shadow-[3px_3px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressForm;