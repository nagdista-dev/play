import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { CloudUpload, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  return (
    <div>
      <div className="sticky top-0 left-0 w-full px-10 py-5 border-b flex items-center justify-between">
        <div className="">
          <Link to={"/"}>
            <h2 className="play-font select-none cursor-pointer font-black text-3xl">
              Safe
              <span className=" play-font bg-linear-to-r from-red-500 via-green-500 to-blue-500  text-transparent bg-clip-text">
                Pixels
              </span>
            </h2>
          </Link>
        </div>
        <div className="">
          <button className="rounded-md flex items-center justify-center gap-2 border border-dashed px-5 py-2  cursor-pointer  ">
            Upload
            <CloudUpload />
          </button>
        </div>
        {/* LOGIN */}
        <div className="">
          {user ? (
            <UserButton />
          ) : (
            <button
              className="px-5 py-2 bg-red-500 rounded-md text-white shadow"
              onClick={openSignIn}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
