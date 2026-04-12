import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Home, Grid2X2, Store, User } from "lucide-react";
import { Button } from "../retroui/Button";
import { Tooltip } from "../retroui/Tooltip";
import { Avatar } from "../retroui/Avatar";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/userSlice";
import { API_URL_USER } from "@/api/api";
function Navbar() {
  const accessToken = localStorage.getItem("accessToken");
  const { user } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.product);
  const [loading, setLoading] = useState(false);
  const admin = user?.role === "admin";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL_USER}/logout`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (res.data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        toast.success(res.data.message);
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ── DESKTOP NAVBAR — same as before, hidden on mobile ── */}
      <div className="split-bg hidden md:block">
        <nav className="w-full h-16 flex border-b-3 border-black">
          {/* LEFT */}
          <div className="w-1/2 flex items-center justify-between px-8">
            <NavLink to="/">
              <h1 className="text-xl font-semibold tracking-wide">Fashono</h1>
            </NavLink>
            <div className="flex gap-8 text-sm font-medium font-BRODISH-demo leading-[1.2] tracking-[1.5px]">
              {["/", "/collection", "/about", "/store"].map((path, i) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => isActive ? "underline" : "hover:underline"}
                >
                  {["Home", "Collection", "About", "Store"][i]}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-1/2 flex items-center justify-end gap-6 px-8">
            {user && (
              <Link to="/profile">
                <Tooltip.Provider>
                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <Avatar className="w-9 h-9 border-2 border-black bg-white rounded-none shadow-[4px_4px_0px_#000] hover:shadow-none transition-all">
                        <Avatar.Image src={user.profilePic} alt="User Avatar" className="object-cover rounded-none" />
                      </Avatar>
                    </Tooltip.Trigger>
                    <Tooltip.Content>{user.firstName}</Tooltip.Content>
                  </Tooltip>
                </Tooltip.Provider>
              </Link>
            )}
            {admin && (
              <Link to="/dashboard/sales">
                <Tooltip.Provider>
                  <Tooltip>
                    <Tooltip.Trigger asChild>
                      <Button variant="outline" className="p-2 border border-black bg-white shadow-[4px_4px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                        <LayoutDashboard size={18} />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Dashboard</Tooltip.Content>
                  </Tooltip>
                </Tooltip.Provider>
              </Link>
            )}
            <Link to="/shoping-cart">
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <Button variant="outline" className="relative p-2 border border-black bg-white">
                      <span className="absolute -top-1 -left-1 bg-black text-white text-[11px] px-1 rounded-full flex items-center justify-center">
                        {cart?.items?.length || 0}
                      </span>
                      <ShoppingBag size={18} />
                    </Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content>Shopping bag</Tooltip.Content>
                </Tooltip>
              </Tooltip.Provider>
            </Link>
            {user ? (
              <Button variant="outline" className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]" onClick={handleLogout} disabled={loading}>
                {loading ? "Logging out..." : "Log Out"}
              </Button>
            ) : (
              <>
                <Button variant="outline" className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button variant="link" className="mr-4 font-BRODISH-demo leading-[1.2] tracking-[1.5px]">
                  <Link to="/signin">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* ── MOBILE TOP BAR — sirf logo ── */}
      <div className="md:hidden split-bg">
        <nav className="w-full h-14 flex items-center justify-between px-4 border-b-3 border-black">
          <NavLink to="/">
            <h1 className="text-xl font-semibold tracking-wide">Fashono</h1>
          </NavLink>
          {/* Admin shortcut — sirf admin ke liye */}
          {admin && (
            <Link to="/dashboard/sales">
              <Button variant="outline" className="p-2 border border-black bg-white">
                <LayoutDashboard size={18} />
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* ── MODERN NEOBRUTALIST BOTTOM NAV ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white h-16 flex items-center justify-around px-1"
        style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>

        {/* Home */}
        <Link to="/" className="flex flex-col items-center gap-[3px] flex-1 py-2">
          <div className="w-8 h-7 flex items-center justify-center">
            <Home size={18} strokeWidth={isActive("/") ? 2.2 : 1.8}
              className={isActive("/") ? "text-black" : "text-gray-400"} />
          </div>
          <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/") ? "text-black font-medium" : "text-gray-400"}`}>Home</span>
          {isActive("/") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
        </Link>

        {/* Collection */}
        <Link to="/collection" className="flex flex-col items-center gap-[3px] flex-1 py-2">
          <div className="w-8 h-7 flex items-center justify-center">
            <Grid2X2 size={18} strokeWidth={isActive("/collection") ? 2.2 : 1.8}
              className={isActive("/collection") ? "text-black" : "text-gray-400"} />
          </div>
          <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/collection") ? "text-black font-medium" : "text-gray-400"}`}>Collection</span>
          {isActive("/collection") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
        </Link>

        {/* Cart — center, pill highlight */}
        <Link to="/shoping-cart" className="flex flex-col items-center gap-[3px] flex-1 py-2">
          <div className={`relative flex items-center justify-center h-7 px-3 rounded-lg transition-all ${isActive("/shoping-cart") ? "bg-black" : ""}`}>
            <ShoppingBag size={18} strokeWidth={1.8}
              className={isActive("/shoping-cart") ? "text-white" : "text-gray-400"} />
            {(cart?.items?.length || 0) > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] w-[14px] h-[14px] rounded-full flex items-center justify-center border-[1.5px] border-white font-semibold">
                {cart?.items?.length || 0}
              </span>
            )}
          </div>
          <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/shoping-cart") ? "text-black font-medium" : "text-gray-400"}`}>Cart</span>
          {isActive("/shoping-cart") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
        </Link>

        {/* Store */}
        <Link to="/store" className="flex flex-col items-center gap-[3px] flex-1 py-2">
          <div className="w-8 h-7 flex items-center justify-center">
            <Store size={18} strokeWidth={isActive("/store") ? 2.2 : 1.8}
              className={isActive("/store") ? "text-black" : "text-gray-400"} />
          </div>
          <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/store") ? "text-black font-medium" : "text-gray-400"}`}>Store</span>
          {isActive("/store") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
        </Link>

        {/* Profile / Sign In */}
        {user ? (
          <Link to="/profile" className="flex flex-col items-center gap-[3px] flex-1 py-2">
            <div className="w-8 h-7 flex items-center justify-center">
              <Avatar className={`w-[22px] h-[22px] rounded-lg border-[1.5px] ${isActive("/profile") ? "border-black" : "border-gray-200"} transition-all`}>
                <Avatar.Image src={user.profilePic} alt="User" className="object-cover rounded-lg" />
              </Avatar>
            </div>
            <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/profile") ? "text-black font-medium" : "text-gray-400"}`}>Profile</span>
            {isActive("/profile") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
          </Link>
        ) : (
          <Link to="/signin" className="flex flex-col items-center gap-[3px] flex-1 py-2">
            <div className="w-8 h-7 flex items-center justify-center">
              <User size={18} strokeWidth={isActive("/signin") ? 2.2 : 1.8}
                className={isActive("/signin") ? "text-black" : "text-gray-400"} />
            </div>
            <span className={`text-[10px] tracking-wide font-BRODISH-demo ${isActive("/signin") ? "text-black font-medium" : "text-gray-400"}`}>Sign In</span>
            {isActive("/signin") && <div className="w-4 h-[2.5px] bg-black rounded-full" />}
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
