import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";
import ProfilePic from "./ProfilePic";
const Navbar = () => {
  const { open, setOpen, user ,logout} = useAppContext();
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all ">
      <Link to="/">
        <h2 className="font-bold text-2xl">
          Edu
          <span className="bg-linear-to-r from-red-500 to-indigo-500 bg-clip-text text-transparent">
            Swap
          </span>
        </h2>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="#">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Contact</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <Search className="w-4 h-4" />
        </div>
        {user ? (
          <ProfilePic />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        {/* Menu Icon SVG */}
        {user ? (
          <ProfilePic profilePic={user.profilePic} />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } mt-50 absolute top-60px left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to="/" className="block">
          Home
        </Link>
        <Link to="#" className="block">
          About
        </Link>
        <a to="#" className="block">
          Contact
        </a>
        {user ? (
          <button
            onClick={() => {
              setOpen(false);
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
