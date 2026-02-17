import { NavLink, Link } from "react-router-dom";
import { Search, ShoppingBag } from "lucide-react";
import { Button } from "../retroui/Button";
import { Tooltip } from "../retroui/Tooltip";
import { Avatar } from "../retroui/Avatar";

function Navbar() {
  const user = true;
  return (
    <>
      <nav className="w-full h-16 flex border-b-2 border-black">
        {/* LEFT SIDE (Orange Section) */}
        <div className="w-1/2 bg-[#F59A3D] flex items-center justify-between px-8">
          {/* Logo */}
          <h1 className="text-xl font-semibold tracking-wide">Fashono</h1>

          {/* Links */}
          <div className="flex gap-8 text-sm font-medium justify-end font-BRODISH-demo leading-[1.2] tracking-[1.5px] ">
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

        {/* RIGHT SIDE (Green Section) */}
        <div className="w-1/2 bg-[#C4D96F] flex items-center justify-end gap-6 px-8">
          {/* search icon  */}
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
              <Tooltip.Content variant="default">Search bar</Tooltip.Content>
            </Tooltip>
          </Tooltip.Provider>
          {user && (
            <Link to={"/profile"}>
              {/* profile */}
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger asChild>
                    <Avatar
                      className="w-9 h-9 
                   border-2 border-black 
                   bg-white 
                   rounded-none
                   shadow-[4px_4px_0px_#000] 
                   hover:shadow-none 
                   transition-all"
                    >
                      <Avatar.Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                        alt="User Avatar"
                        className="object-cover rounded-none"
                      />

                      <Avatar.Fallback className="font-bold">
                        AH
                      </Avatar.Fallback>
                    </Avatar>
                  </Tooltip.Trigger>

                  <Tooltip.Content variant="default">Me</Tooltip.Content>
                </Tooltip>
              </Tooltip.Provider>
            </Link>
          )}

          <Link to={"/shoping-cart"}>
            {/* shoping bag icon */}

            <Tooltip.Provider>
              <Tooltip>
                <Tooltip.Trigger asChild>
                  <Button
                    variant="outline"
                    className="relative p-2 border border-black bg-white"
                  >
                    {/* Badge */}
                    <span
                      className="absolute -top-1 -left-1 
                         bg-black text-white 
                         text-[11px] px-1 rounded-full 
                         flex items-center justify-center"
                    >
                      1
                    </span>

                    <ShoppingBag size={18} />
                  </Button>
                </Tooltip.Trigger>

                <Tooltip.Content variant="default">
                  Shopping bag
                </Tooltip.Content>
              </Tooltip>
            </Tooltip.Provider>
          </Link>
          {user ? (
            //  logout btn

            <>
              <Button
                variant="outline"
                className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]  "
              >
                <Link to="/logout">Log Out</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="ml-4 bg-orange-400 text-black font-BRODISH-demo leading-[1.2] tracking-[1.5px]  "
              >
                <Link to="/signup">Sign Up</Link>
              </Button>

              <Button
                variant="link"
                className=" mr-4 font-BRODISH-demo leading-[1.2] tracking-[1.5px] "
              >
                <Link to="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
