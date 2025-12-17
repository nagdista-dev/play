import React from "react";
import useAppContext from "../context/AppContext";

const User = () => {
  const { handleUpdateProfilePic, inputProfilePic, handleProfileInputChange } =
    useAppContext();
  return (
    <div className="m-2">
      <input
        type="file"
        className="rounded-md px-3 py-2 border"
        required
        accept="/image*"
        onChange={handleProfileInputChange}
      />
      {inputProfilePic && (
        <button
          onClick={handleUpdateProfilePic}
          className="mt-2 bg-red-500 px-3 py-2 rounded-md "
        >
          update Profile
        </button>
      )}
    </div>
  );
};

export default User;
