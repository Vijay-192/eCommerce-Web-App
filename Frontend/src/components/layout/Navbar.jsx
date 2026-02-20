import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "../retroui/Button";
import { Tooltip } from "../retroui/Tooltip";
import { Avatar } from "../retroui/Avatar";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";

function Navbar() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `
        ${API_BASE_URL}/logout
        `,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full h-16 flex border-b-3 border-black">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#F59A3D] flex items-center justify-between px-8">
        {/* Logo */}
        <h1 className="text-xl font-semibold tracking-wide">Fashono</h1>

        {/* Links */}
        <div className="flex gap-8 text-sm font-medium justify-end font-BRODISH-demo leading-[1.2] tracking-[1.5px]">
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Collection
          </NavLink>

          <NavLink
            to="/store"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            Store
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "underline" : "hover:underline"
            }
          >
            About
          </NavLink>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#C4D96F] flex items-center justify-end gap-6 px-8">
        {/* Search */}
        <Tooltip.Provider>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <Button
                variant="outline"
                className="p-2 border border-black bg-white"
              >
                <Search size={18} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Search bar</Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>

        {/* Profile */}
        {user && (
          <Link to="/profile">
            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Avatar className="w-9 h-9 border-2 border-black bg-white rounded-none shadow-[4px_4px_0px_#000] hover:shadow-none transition-all">
                    <Avatar.Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                      alt="User Avatar"
                      className="object-cover rounded-none"
                    />
                    {/* {user.profile} */}
                    {/* <Avatar.Fallback className="font-bold">AH</Avatar.Fallback> */}
                  </Avatar>
                </Tooltip.Trigger>
                <Tooltip.Content> {user.firstName}</Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
          </Link>
        )}

        {/* Shopping Bag */}
        <Link to="/shoping-cart">
          <Tooltip.Provider>
            <Tooltip>
              <Tooltip.Trigger asChild>
                <Button
                  variant="outline"
                  className="relative p-2 border border-black bg-white"
                >
                  <span className="absolute -top-1 -left-1 bg-black text-white text-[11px] px-1 rounded-full flex items-center justify-center">
                    1
                  </span>
                  <ShoppingBag size={18} />
                </Button>
              </Tooltip.Trigger>
              <Tooltip.Content>Shopping bag</Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
        </Link>

        {/* Auth Buttons */}
        {user ? (
          <Button
            variant="outline"
            className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Log Out"}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>

            <Button
              variant="link"
              className="mr-4 font-BRODISH-demo leading-[1.2] tracking-[1.5px]"
            >
              <Link to="/signin">Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
