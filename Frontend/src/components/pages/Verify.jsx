import React from "react";
import { FiMail } from "react-icons/fi";

function Verify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-300 p-4">
      {/* Card */}
      <div
        className="
          w-full max-w-md
          bg-white
          border-4 border-black
          shadow-[8px_8px_0px_black]
          p-8
          text-center
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className="
              bg-blue-300
              border-4 border-black
              p-4
              shadow-[4px_4px_0px_black]
            "
          >
            <FiMail size={40} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase mb-3">
          Check Your Email
        </h1>

        {/* Message */}
        <p
          className="
            text-lg font-bold
            border-2 border-black
            bg-pink-200
            p-4
            shadow-[4px_4px_0px_black]
          "
        >
          Check your email to verify your account.
        </p>
      </div>
    </div>
  );
}

export default Verify;
