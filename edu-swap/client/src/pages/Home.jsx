import React from "react";
import ProfilePic from "../components/ProfilePic";
import User from "./User";
import useAppContext from "../context/AppContext";

const Home = () => {
  const { user } = useAppContext();
  return (
    <div className="m-2">
      {user && <User />}
      {!user && <p>Login First</p>}
    </div>
  );
};

export default Home;
