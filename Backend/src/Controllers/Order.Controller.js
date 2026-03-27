import razorpayInstance from "../Config/Razorpay.js";
import { Order } from "../Models/Order.Model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency } = req.body;
        const options = {
            amount: Math.round(Number(amount) * 100), // conver to currency
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,

        }
        const razorpayOrder = await razorpayInstance.orders.create(options);

        // save order in db
        const newOrder = new Order({
            user: req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency,
            status: "Pending",
            razorpayOrderId: razorpayOrder.id,
        })
        await newOrder.save()
        res.json({
            success: true,
            order: newOrder,
            razorpayOrder,
            message: "Order created successfully",
        })
    } catch (error) {
        console.error(" Error is create Order:", error);

        res.status(500).json({ message: "Internal server error", error });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { razorpay_order_id, razorpay_payment_Id, signature, paymentFailed } = req.body;
        if (paymentFailed) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Payment failed",
                order
            });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_Id;
        const expectedSignature = crypto.
            createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },

                {
                    status: "Paid",
                    razorpayPaymentId: razorpay_payment_Id,
                    razorpaySignature: razorpay_signature,
                },
                { new: true }
            );
            await Cart.findOneAndUpdate(
                { userId }, { $set: { items: [], totalPrice: 0, } },

            )
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                order
            })
        }
        else {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            })
        }
    } catch (error) {
        console.error(" Error is verify Payment:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}