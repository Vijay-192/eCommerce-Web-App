import React from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center auth-bg">
      <div className="bg-gray-200 border-4 border-black p-8 w-full max-w-md relative shadow-md">
        <div className="absolute bottom-[-10px] left-2 w-full h-full bg-black -z-10"></div>

        <h1 className="text-2xl font-bold text-center mb-2">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Create your account by entering details below
        </p>
        <div className="relative w-full h-[6px] bg-black mb-8">
          <div className="absolute top-[4px] left-[4px] w-full h-full bg-gray-400 -z-10"></div>
        </div>
        <form className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="block font-medium mb-2">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="First name"
                className="w-full border-2 border-black p-2.5 bg-gray-200 focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="lastName" className="block font-medium mb-2">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Last name"
                className="w-full border-2 border-black p-2.5 bg-gray-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="block font-medium mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-black p-2.5 bg-gray-200 focus:outline-none"
            />
          </div>

          {/* Password */}

          <div>
            <Label htmlFor="password" className="block font-medium mb-2">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full border-2 border-black p-2.5 pr-14 bg-gray-200 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer  absolute right-2 top-1/2 -translate-y-1/2 
                 border-2 border-black bg-white 
                 p-1.5 shadow-[3px_3px_0px_black] 
                 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <Button className="w-full flex justify-center">Create account</Button>

          <p className="text-center mt-3 text-gray-700 text-sm">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer font-medium"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
