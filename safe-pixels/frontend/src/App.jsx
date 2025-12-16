import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ImageCard from "./components/ImageCard";
import axios from "axios";

const App = () => {
  const [allImages, setAllImages] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getAllImages = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/images/all`);
      console.log("Fetched Images:", data); 
      setAllImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center gap-5 mt-5 flex-wrap">
        {allImages.map((image) => (
          <ImageCard
            key={image._id}
            link={image.link}
            ownerName={image.owner?.name || "Unknown"}
            uploadedTime={new Date(image.createdAt).toLocaleString()}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
