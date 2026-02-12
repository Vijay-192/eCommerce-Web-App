import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      requird: true,
      unique: true,
    },
    password: {
      type: String,
      requird: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    profilePic: {
      type: String,
      default:""
    },
    profilePicPublicId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
