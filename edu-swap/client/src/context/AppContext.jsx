import React, { useEffect } from "react";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  //   !States
  const [state, setState] = useState("login");
  const [inputProfilePic, setInputProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);
  // !Handle Update Profile Pic
  const handleUpdateProfilePic = async (e) => {
    const fData = new FormData();
    fData.append("image", inputProfilePic);
    fData.append("token",token);
    const { data } = await axios.post(
      `${backendURL}/api/user/update-profile-pic`,
       fData 
    );
    toast(data.message);
  };
  //   !Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //   !Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${backendURL}/api/user/${state === "login" ? "login" : "signup"}`,
      formData
    );
    toast(data.message);
    setToken(data.user.token);
    localStorage.setItem("token", data.user.token);
    navigate("/");
  };
  const logout = () => {
    setOpen(false);
    setUser(null);
    navigate("/login");
  };

  const getUser = async () => {
    const { data } = await axios.post(`${backendURL}/api/user/get-user`, {
      token,
    });
    setUser(data.user);
  };
  // !Handle Profile Pic
  const handleProfileInputChange = (e) => {
    console.log("start");
    console.log(e.target.files[0]);
    setInputProfilePic(e.target.files[0]);
    console.log(inputProfilePic);
  };
  useEffect(() => {
    getUser();
  }, [token]);
  //   !Value
  const value = {
    backendURL,
    open,
    setOpen,
    formData,
    setFormData,
    handleSubmit,
    handleChange,
    state,
    setState,
    token,
    user,
    logout,
    handleUpdateProfilePic,
    inputProfilePic,
    handleProfileInputChange,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;
