import imagekit from "../configs/imagekit.js";
import fs from "fs";
import Image from "../models/Image.js";
// !Start Building
// !Upload Image
export const uploadImag = async (req, res) => {
  try {
    const image = req.file;
    const imageBuffer = fs.readFileSync(req.file.path);
    const imagekitResponse = await imagekit.upload({
      file: imageBuffer,
      fileName: image.originalname,
      folder: "safe-pixels",
    });
    const imageURL = imagekitResponse.url;

    await Image.create({ link: imageURL, owner: req.user._id });
    res.json({ message: "image added successfully" });
  } catch (error) {
    res.json(error.message);
  }
};

// !Get All Images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({}).populate("owner");
    console.log(images);
    res.json(images);
  } catch (error) {
    res.json(error.message);
  }
};
