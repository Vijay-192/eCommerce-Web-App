import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = (token, email) => {
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
    text: ` Hello,

Thank you for registering with us.

Please verify your email address by clicking the link below:
    
    ${process.env.FRONTEND_URI}/verify-email/
    ${token}
    This link will expire in 10 minutes.

If you did not create an account, please ignore this email.

Best regards,
Your App Team
    `,
  };

  transporter.sendMail(mailConfiguration, function (error, info) {
    if (error) throw Error(error);
    console.log("Email sent successfully");
    console.log(info);
  });
};
  