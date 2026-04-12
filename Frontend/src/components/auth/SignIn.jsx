import React, { useState } from "react";
import { FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import { Loader } from "../retroui/Loader";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { API_URL_USER } from "@/api/api";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

      const res = await axios.post(`${API_URL_USER}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        navigate("/");
        dispatch(setUser(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex items-center justify-center bg-[#C4D96F] relative">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-3 left-3 border-2 border-black bg-white p-2 shadow-md active:scale-95 z-10"
      >
        <FiArrowLeft size={16} />
      </button>

      {/* SCALE WRAPPER 👇 */}
      <div className="w-full max-w-md scale-[0.92] sm:scale-100 origin-center">

        {/* CARD */}
        <div className="bg-gray-200 border-4 border-black p-8 w-full relative shadow-md">

          <div className="absolute bottom-[-10px] left-2 w-full h-full bg-black -z-10"></div>

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-center mb-2">Sign In</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Sign in to your account
          </p>

          {/* DIVIDER */}
          <div className="relative w-full h-[6px] bg-black mb-8">
            <div className="absolute top-[4px] left-[4px] w-full h-full bg-gray-400 -z-10"></div>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={submitHandler}>

            {/* EMAIL */}
            <div>
              <Label className="block font-medium mb-2">
                Email Address
              </Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <Label className="block font-medium mb-2">
                Password
              </Label>

              <div className="relative">
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                  className="pr-14"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white p-1.5 shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center"
            >
              {loading ? <Loader variant="secondary" /> : "Sign In"}
            </Button>

            {/* FOOTER */}
            <p className="text-center mt-3 text-gray-700 text-sm">
              Don't have an account?{" "}
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
    </div>
  );
}

export default SignIn;