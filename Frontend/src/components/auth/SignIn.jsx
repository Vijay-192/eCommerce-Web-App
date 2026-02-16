
import React from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Loader } from "../retroui/Loader";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const { formData, handleChange, submitHandler, loading } = useLogin();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center auth-bg">
      <div className="bg-gray-200 border-4 border-black p-8 w-full max-w-md relative shadow-md">
        <div className="absolute bottom-[-10px] left-2 w-full h-full bg-black -z-10"></div>

        <h1 className="text-2xl font-bold text-center mb-2">Sign In</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sign in to your account
        </p>
        <div className="relative w-full h-[6px] bg-black mb-8">
          <div className="absolute top-[4px] left-[4px] w-full h-full bg-gray-400 -z-10"></div>
        </div>
        <form className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="block font-medium mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-black p-2.5 bg-gray-200 focus:outline-none"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block font-medium mb-2">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full border-2 border-black p-2.5 pr-14 bg-gray-200 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 
                     border-2 border-black bg-white 
                     p-1.5 shadow-[3px_3px_0px_black] 
                     active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
          <Button
            className="w-full flex justify-center"
            onClick={submitHandler}
          >
            {loading ? <Loader variant="secondary" /> : "Sign In"}
          </Button>

          <p className="text-center mt-3 text-gray-700 text-sm">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer font-medium"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
