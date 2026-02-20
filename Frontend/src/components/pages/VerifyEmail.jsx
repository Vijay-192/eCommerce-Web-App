import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiMail } from "react-icons/fi";

function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  const verifyEmail = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/verify/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("success");
        setMessage("Email verified successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage("Verification failed. Please try again.");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, [token]);

  // Different colors for different states
  const boxColor =
    status === "success"
      ? "bg-green-300"
      : status === "error"
        ? "bg-red-300"
        : "bg-blue-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-300 p-4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_black]">
            <FiMail size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase mb-4">
          Email Verification
        </h1>

        {/* Status Message */}
        <p
          className={`text-lg font-bold border-2 border-black p-4 shadow-[4px_4px_0px_black] ${boxColor}`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default VerifyEmail;
