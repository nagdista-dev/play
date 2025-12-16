import React from "react";

const ImageCard = ({ link, uploadedTime, ownerName }) => {
  return (
    <div>
      <div className="cursor-pointer  shadow-md rounded-md overflow-hidden ">
        <div className="">
          <img src={link} alt="" />
        </div>
        <div className="p-3">
          <h3 className="text-xl font-medium">{ownerName}</h3>
          <p className="text-gray-400 text-sm py-2">{new Date(uploadedTime).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
