import React, { useState } from "react";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
import { Loader } from "../retroui/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { API_URL_USER } from "@/api/api";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        navigate("/verify");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex items-center justify-center bg-[#F59A3D] relative">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-3 left-3 border-2 border-black bg-white p-2 shadow-md active:scale-95 z-10"
      >
        <FiArrowLeft size={16} />
      </button>

      {/* SCALE WRAPPER 👇 */}
      <div className="w-full max-w-md scale-[0.9] sm:scale-100 origin-center">

        {/* CARD */}
        <div
          className="bg-gray-200 border-4 border-black 
          w-full 
          p-4 sm:p-6 md:p-8 
          flex flex-col justify-center
          shadow-md"
        >
          {/* HEADER */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-1">
            Sign Up
          </h1>

          <p className="text-center text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
            Sign up to your account
          </p>

          {/* DIVIDER */}
          <div className="relative w-full h-[5px] bg-black mb-4 sm:mb-6">
            <div className="absolute top-[3px] left-[3px] w-full h-full bg-gray-400 -z-10"></div>
          </div>

          {/* FORM */}
          <form className="space-y-3 sm:space-y-4" onSubmit={submitHandler}>
            
            {/* NAME */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-1">
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white p-1.5"
                >
                  {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 text-sm py-2.5"
            >
              {loading ? (
                <>
                  <Loader variant="secondary" />
                  Please wait...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            {/* FOOTER */}
            <p className="text-center text-gray-700 text-xs sm:text-sm mt-1">
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
    </div>
  );
}

export default SignUp;