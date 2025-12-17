import jwt from "jsonwebtoken";
const protect = async (req, res, next) => {
  try {
    const {token} = req.body;
    console.log(token)
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userId;
    next();
  } catch (error) {
    res.json(error.message);
  }
};

export default protect;
