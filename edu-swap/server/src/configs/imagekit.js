import ImageKit from "imagekit";

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_END_POINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imagekit;
