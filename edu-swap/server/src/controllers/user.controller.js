import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fs from "fs";
import imagekit from "../configs/imagekit.js";
// !Start Building
// !Hashing Password
export const hashPasswordFunc = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};
// !Generate Token
export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
// !Signup
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ message: "All Fields Are Required" });
    }

    if (password.length < 8) {
      return res.json({ message: "Password must be greater than 7 chars" });
    }

    const hashedPass = await hashPasswordFunc(password);

    const newUser = await User.create({ name, email, password: hashedPass });
    const token =  generateToken({ userId: newUser._id });
    res.json({
      message: "User Created Successfully",
      user: { name: newUser.name, email: newUser.email, token },
    });
  } catch (error) {
    res.json(error.message);
  }
};
// !Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All Fields Are Required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "Auth Failed" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ message: "Auth Failed" });
    }

    const token = generateToken({ userId: user._id });

    res.json({
      message: "Login  Successfully",
      user: { name: user.name, email: user.email, token },
    });
  } catch (error) {
    res.json(error.message);
  }
};

// !Update Profile Picture

export const updateProfilePic = async (req, res) => {
  try {
    const userId = "6942a5f63d936f46da3d993b";
    const user = await User.findById(userId);
    const profilePic = req.file;
    if (!profilePic) {
      return res.json({ message: "image not found" });
    }
    const imageBuffer = fs.readFileSync(profilePic.path);

    const response = await imagekit.upload({
      file: imageBuffer,
      fileName: profilePic.originalname,
    });
    const profilePicURL = response.url;

    await User.findByIdAndUpdate(
      userId,
      { profilePic: profilePicURL },
      { new: true }
    );
    return res.json({
      message: "Profile Picture Updated Successfully",
    });
  } catch (error) {
    res.json(error.message);
  }
};
