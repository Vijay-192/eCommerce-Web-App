import { User } from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../Services/Email/Verify.Email.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: " all fields are required",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "user register successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const Verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(400).json({
        success: false,
        Message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];
    let decode;
    try {
      decode = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token verification failed",
      });
    }
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const reVerify = async (req,res)=>{

  try {
    const {email}=req.body
    const user =await User.findOne({email})
    if (!user) {
      return res.status(400).json({
        success:false,
        message:"User not found"
      })
    }
    const token = jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn:'10m'})
    verifyEmail(token,email)
    user.token=token
    await user.save()
    return res.status(200).json({
      success:true,
      message:"Verification email sent again successfully",
      token:user.token
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}