
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search, Pencil, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/retroui/Button";
import userAvatar from "@/assets/user.svg";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL_USER;

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/all-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);



  const filteredUsers = users.filter((user) => {
    const firstName = user.firstName?.toLowerCase() || "";
    const lastName = user.lastName?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";

    const fullName = `${firstName} ${lastName}`;
    const search = searchTerm.toLowerCase();

    return (
      firstName.includes(search) ||
      lastName.includes(search) ||
      fullName.includes(search) ||
      email.includes(search)
    );
  });

  return (
    <div className="h-[90vh] flex justify-center">
      <div className="w-full max-w-4xl p-8">

        {/* TITLE */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold">User Management</h1>
          <p className="text-gray-600 text-sm">
            View and manage registered users
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-[260px] mx-auto mb-8">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
          />

          <input
            type="text"
            placeholder="Search name / email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-4 border-black pl-9 pr-3 py-1.5 bg-white
            shadow-[4px_4px_0px_black] focus:outline-none text-sm font-semibold"
          />
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center font-bold text-gray-600 mb-6">
            Loading users...
          </div>
        )}

        {/* USER GRID */}
        <div className="grid grid-cols-2 gap-5">

          {!loading && filteredUsers.length === 0 && (
            <div className="col-span-2 text-center font-bold text-gray-600">
              No users found
            </div>
          )}

          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-4 bg-[#F59A3D]
              border-4 border-black shadow-[5px_5px_0px_black]"
            >

              {/* AVATAR */}
              <img
                src={
                  user.profilePic ||
                  userAvatar
                }
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-black"
              />

              {/* USER INFO */}
              <div className="flex-1">

                {/* FULL NAME */}
                <h2 className="font-bold text-sm">
                  {[user.firstName, user.lastName].filter(Boolean).join(" ")}
                </h2>

                <p className="text-xs text-gray-700">{user.email}</p>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-2">

                  <Button
                    onClick={() =>
                      navigate(`/dashboard/user/${user?._id}`)

                    }

                    variant={"outline"}
                    className=" cursor-pointer flex bg-white items-center gap-1 "
                  >
                    <Pencil size={13} />
                    Edit
                  </Button>

                  <button
                    className="cursor-pointer flex items-center gap-1 border-3 border-black px-2 py-1
                    bg-black text-white text-xs font-bold shadow-[2px_2px_0px_black]
                    active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <Eye size={12} />
                    Show the Order
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminUser;