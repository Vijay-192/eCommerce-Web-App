
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import axios from "axios";
import userAvatar from "@/assets/user.svg";

function UserInfo() {
  const navigate = useNavigate();
  const [updateUser, setUpdateUser] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const { userId } = useParams();
  const user = useSelector((state) => state.user.user);

  const API_BASE_URL = import.meta.env.VITE_API_URL_USER;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setUpdateUser((prev) => ({
      ...prev,
      profilePic: URL.createObjectURL(selectedFile),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updateUser?._id) {
      toast.error("User not found");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("Please login again");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName || "");
      formData.append("lastName", updateUser.lastName || "");
      formData.append("email", updateUser.email || "");
      formData.append("phoneNo", updateUser.phoneNo || "");
      formData.append("address", updateUser.address || "");
      formData.append("city", updateUser.city || "");
      formData.append("zipCode", updateUser.zipCode || "");
      formData.append("role", updateUser.role || "user");

      if (file) {
        formData.append("file", file);
      }

      const res = await axios.put(
        `${API_BASE_URL}/update/${updateUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Profile updated successfully");
        dispatch(setUser(res.data.user));
        setUpdateUser(res.data.user);
        navigate(-1);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/get-user/${userId}`);
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.error("Get user error:", error);
      toast.error(error.response?.data?.message || "Failed to get user details");
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  if (!updateUser) {
    return (
      <div className="h-[90vh] w-full flex items-center justify-center bg-gray-100">
        <div className="text-xl font-extrabold border-4 border-black px-8 py-4 shadow-[6px_6px_0px_black]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] w-full flex items-center justify-center bg-gray-100 font-sans">
      <div className="w-[950px] bg-white border-4 border-black shadow-[8px_8px_0px_black] flex p-8 gap-12 relative">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer absolute -top-5 -left-5 bg-[#ceef4a] border-4 border-black p-3 shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
        >
          <ArrowLeft size={18} />
        </button>

        {/* LEFT - Profile */}
        <div className="flex flex-col items-center gap-5 w-[260px] border-r-4 border-black pr-8">

          <img
            src={updateUser.profilePic || userAvatar}
            className="w-40 h-40 object-cover rounded-[8px] border-4 border-black shadow-[8px_8px_0px_black]"
            alt="Profile"
          />

          <label className="cursor-pointer bg-[#F59A3D] text-black font-bold px-6 py-2 border-4 border-black shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
            Change Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <div className="flex flex-col gap-3 w-full mt-4">
            <span className="font-extrabold text-lg">Role</span>

            <label className="flex items-center justify-between px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_black] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
              <span>User</span>
              <input
                type="radio"
                name="role"
                value="user"
                checked={updateUser.role === "user"}
                onChange={handleChange}
                className="accent-black"
              />
            </label>

            <label className="flex items-center justify-between px-4 py-2 bg-[#ceef4a] border-4 border-black shadow-[4px_4px_0px_black] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition">
              <span>Admin</span>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={updateUser.role === "admin"}
                onChange={handleChange}
                className="accent-black"
              />
            </label>
          </div>
        </div>

        {/* RIGHT - Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold mb-6 border-b-4 border-black pb-2">
            Update Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstName"
                className="border-4 border-black p-2 font-semibold"
                placeholder="First Name"
                value={updateUser.firstName || ""}
                onChange={handleChange}
              />
              <input
                name="lastName"
                className="border-4 border-black p-2 font-semibold"
                placeholder="Last Name"
                value={updateUser.lastName || ""}
                onChange={handleChange}
              />
            </div>

            <input
              name="email"
              className="border-4 border-black p-2 font-semibold w-full bg-gray-200"
              disabled
              value={updateUser.email || ""}
            />

            <input
              name="phoneNo"
              className="border-4 border-black p-2 font-semibold w-full"
              placeholder="Phone Number"
              value={updateUser.phoneNo || ""}
              onChange={handleChange}
            />

            <input
              name="address"
              className="border-4 border-black p-2 font-semibold w-full"
              placeholder="Address"
              value={updateUser.address || ""}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                className="border-4 border-black p-2 font-semibold"
                placeholder="City"
                value={updateUser.city || ""}
                onChange={handleChange}
              />
              <input
                name="zipCode"
                className="border-4 border-black p-2 font-semibold"
                placeholder="Zip Code"
                value={updateUser.zipCode || ""}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full mt-4 bg-[#ceef4a] border-4 border-black font-extrabold py-3 shadow-[6px_6px_0px_black] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default UserInfo;