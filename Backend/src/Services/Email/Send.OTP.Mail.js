import nodemailer from "nodemailer";
import "dotenv/config";

export const SendOTPmail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfiguration = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email verification",
    html: `<p>OTP for password reset is : <b>${otp}</b></p>`,
  };

  try {
    const info = await transporter.sendMail(mailConfiguration);
    console.log("Email sent successfully");
    console.log(info);
  } catch (error) {
    console.error(error);
  }
};
