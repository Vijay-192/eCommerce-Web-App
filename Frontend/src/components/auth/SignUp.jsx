import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Input } from "../retroui/Input";
import { Label } from "../retroui/Label";
import { Button } from "../retroui/Button";
import { Loader } from "../retroui/Loader";
import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const { formData, handleChange, submitHandler, loading } = useRegister();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center auth-bg">
      <div className="bg-gray-200 border-4 border-black p-8 w-full max-w-md relative shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">Sign Up</h1>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div className="flex gap-4">
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

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
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
