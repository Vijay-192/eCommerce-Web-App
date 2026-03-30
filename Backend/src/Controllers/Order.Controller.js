import razorpayInstance from "../Config/Razorpay.js";
import { Order } from "../Models/Order.Model.js";
import { Cart } from "../Models/Cart.Model.js";
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { products, amount, tax, shipping, currency } = req.body;

        const options = {
            amount: Math.round(Number(amount) * 100),
            currency: currency || "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        const newOrder = new Order({
            userId: req.user._id,
            products,
            amount,
            tax,
            shipping,
            currency,
            status: "Pending",
            razorpayOrderId: razorpayOrder.id,
        });

        await newOrder.save();

        res.json({
            success: true,
            order: razorpayOrder,
            dbOrder: newOrder,
            message: "Order created successfully",
        });

    } catch (error) {
        console.error("Error in createOrder:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const userId = req.user._id;

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            paymentFailed,
        } = req.body;

        if (paymentFailed) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Payment failed",
                order,
            });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const order = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    status: "Paid",
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                },
                { new: true }
            );

            await Cart.findOneAndUpdate(
                { user: userId },
                { $set: { items: [], totalPrice: 0 } }
            );

            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                order,
            });

        } else {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "Failed" },
                { new: true }
            );
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

    } catch (error) {
        console.error("Error in verifyPayment:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
 
export const getMyOrder = async(req,res)=>{
    try {
        const userId = req.id
        const orders = await Order.find({user:userId})
        .populate({path:"products.productId",select:"productName productPrice productImg"})
        .populate("user","firstName lastName email")

        res.status(200).json({
            success:true,
            count:orders.length,
            orders,
            message:"Orders fetched successfully"
        })  
    } catch (error) {
        console.error("Error in getOrder:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
}