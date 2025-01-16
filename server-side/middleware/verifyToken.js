import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) throw new Error("");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throw new Error("");

    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default verifyToken;
