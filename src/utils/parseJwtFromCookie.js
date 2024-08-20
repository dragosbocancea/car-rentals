import jwt from "jsonwebtoken";

export const parseJwtFromCookie = (req) => {
  const token = req.cookies["access-token"];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid or expired token", err);
    return null;
  }
};
