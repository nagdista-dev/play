import React from "react";
import { assets } from "../assets/assets";

const ProfilePic = ({ profilePic = assets.defaultProfilePic }) => {
  return (
    <div className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
      <img
        src={profilePic}
        alt="profilePic"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProfilePic;
