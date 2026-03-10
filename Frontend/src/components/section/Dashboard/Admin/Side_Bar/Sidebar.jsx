import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  CheckSquare,
  BarChart3,
  Mail,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = [
    { to: "/dashboard/sales", label: "Dashboard", icon: <LayoutDashboard /> },
    { to: "/dashboard/add-product", label: "Add Product", icon: <Activity /> },
    { to: "/dashboard/products", label: "Products", icon: <CheckSquare /> },
    { to: "/dashboard/orders", label: "Orders", icon: <BarChart3 /> },
    { to: "/dashboard/users", label: "Users", icon: <Mail /> },
  ];
  return (
    <>
      <div className="flex h-screen fixed bg-yellow-100 overflow-hidden uppercase">
        {/* Overlay (Mobile) */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
        {/* ================= SIDEBAR ================= */}
        <div
          className={`
        group
        fixed md:static top-0 left-0 h-full z-50
        w-21 hover:w-72
        bg-[#81949D] border-r-4 border-black p-4
        transform transition-all duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col
        `}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {/* Title */}
            <h1 className="text-2xl font-black text-black hidden group-hover:block normal-case">
              Admin Panel
            </h1>

            {/* Same Chevron Icons (but no click) */}
            <div className="hidden md:block">
              <div className="p-2 bg-[#F59A3D] border-4 border-black shadow-[4px_4px_0px_#000]">
                <ChevronRight size={25} className="group-hover:hidden" />
                <ChevronLeft size={25} className="hidden group-hover:block" />
              </div>
            </div>
            {/* Mobile Close */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 bg-[#F59A3D] border-4 border-black shadow-[4px_4px_0px_#000]"
            >
              <X size={18} />
            </button>
          </div>
          {/* Menu */}
          <div className="space-y-4 flex-1">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 border-4 border-black 
                shadow-[4px_4px_0px_#000] transition-all duration-200
                ${
                  isActive
                    ? "bg-[#F59A3D]"
                    : "bg-white hover:translate-x-1 hover:translate-y-1"
                }`
                }
              >
                {item.icon}
                <span className="font-black hidden group-hover:block">
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 flex flex-col w-full">
          {/* Mobile Top Bar */}
          <div className="md:hidden flex items-center justify-between p-4 border-b-4 border-black bg-white">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_#000]"
            >
              <Menu size={20} />
            </button>
            <h2 className="font-black text-lg">Dashboard</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
