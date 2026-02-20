import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
import { Loader } from "../retroui/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
function SignUp() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = async e => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await axios.post(
        `
        ${API_BASE_URL}/register
        `,
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
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F59A3D]">
      <div className="bg-gray-200 border-4 border-black p-8 w-full max-w-md relative shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Sign Up</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Sign up to your account
        </p>
        <div className="relative w-full h-[6px] bg-black mb-8">
          <div className="absolute top-[4px] left-[4px] w-full h-full bg-gray-400 -z-10"></div>
        </div>
        <form className="space-y-5" onSubmit={submitHandler}>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-1">
              <Label>Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-14"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 border-2 border-black bg-white p-1.5"
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center gap-2 items-center"
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
