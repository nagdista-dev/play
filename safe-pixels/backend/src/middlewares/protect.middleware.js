import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    if (!req.auth.userId) {
      return res.json({ message: "Auth Failed" });
    }
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {}
};

export default protect;
