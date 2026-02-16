// import nodemailer from "nodemailer";
// import "dotenv/config";

// export const verifyEmail = (token, email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });
//   const mailConfiguration = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: "Email verification",
//     text: ` Hello,
// Thank you for registering with us.
// Please verify your email address by clicking the link below:${process.env.FRONTEND_URI}/verify-email/${token}This link will expire in 10 minutes.
// If you did not create an account, please ignore this email.
// Best regards,
// Your App Team
//     `,
//   };

//   transporter.sendMail(mailConfiguration, function (error, info) {
//     if (error) throw Error(error);
//     console.log("Email sent successfully");
//     console.log(info);
//   });
// };

import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = async (token, email) => {
  try {
    // transporter create
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // email config
    const mailConfiguration = {
      from: `"Your App" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
      <div style="
        font-family: Arial, sans-serif;
        background:#f4f4f4;
        padding:40px 0;
      ">
        <div style="
          max-width:500px;
          margin:auto;
          background:white;
          padding:30px;
          border:3px solid black;
          box-shadow:8px 8px 0px black;
          text-align:center;
        ">
          
          <h2 style="
            margin-bottom:20px;
            font-weight:900;
            letter-spacing:1px;
          ">
            VERIFY YOUR EMAIL
          </h2>

          <p style="margin-bottom:25px; font-size:14px;">
            Thank you for registering.<br/>
            Click the button below to verify your email.
          </p>

          <a href="${process.env.FRONTEND_URI}/verify-email/${token}"
            style="
              display:inline-block;
              padding:14px 28px;
              background:#FFD600;
              color:black;
              text-decoration:none;
              font-weight:800;
              border:3px solid black;
              box-shadow:5px 5px 0px black;
            ">
            VERIFY EMAIL
          </a>

          <p style="margin-top:25px; font-size:12px; color:#555;">
            This link will expire in 10 minutes.<br/>
            If you did not create an account, you can ignore this email.
          </p>

        </div>
      </div>
      `,
    };

    // send mail
    await transporter.sendMail(mailConfiguration);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};
