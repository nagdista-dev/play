import { useAuth, useClerk, UserButton, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { CloudUpload } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const handleInputChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleOpenClick = (e) => {
    inputRef.current.click();
  };
  const handleUpload = async () => {
    const token = await getToken();
    const formData = new FormData();
    formData.append("image", image);
    await axios.post(`${backendURL}/images/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setImage(null);
    navigate("/");
  };
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
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handleOpenClick}
            className=" rounded-md flex items-center justify-center gap-2 border border-dashed px-5 py-2  cursor-pointer  "
          >
            <input
              ref={inputRef}
              onChange={handleInputChange}
              type="file"
              accept="image/*"
              name=""
              id=""
              required
              hidden
            />
            <CloudUpload />
          </button>

          {image && (
            <button
              onClick={handleUpload}
              className=" rounded-md bg-red-500  px-5 py-2  cursor-pointer text-white  "
            >
              Upload
            </button>
          )}
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
