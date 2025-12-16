import React from "react";

const ImageCard = ({ link, uploadedTime, ownerName }) => {
  return (
    <div className="cursor-pointer border border-gray-300 rounded-md overflow-hidden w-full  md:w-100  h-80 mb-2 object-contain ">
      <div className="h-3/4 relative group">
        <div className="absolute w-full h-full bg-black/40 z-10 group-hover:bg-transparent duration-300 transition-all" />
        <img src={link} alt="img" className="w-full h-full object-cover " />
      </div>
      <div className="p-3 h-1/4">
        <h3 className="text-md font-medium">{ownerName}</h3>
        <p className="text-gray-400 text-sm py-2">
          {new Date(uploadedTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
