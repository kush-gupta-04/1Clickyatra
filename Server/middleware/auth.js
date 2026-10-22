import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { asyncHandler } from "./error.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header or Cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access this route, no token");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500);
    throw new Error("Server misconfiguration: JWT_SECRET is not set");
  }

  // Verify token
  const decoded = jwt.verify(token, secret);

  // Attach user to req object
  req.user = await User.findById(decoded.id).select("-password");
  if (!req.user) {
    res.status(401);
    throw new Error("User not found with this token");
  }

  next();
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied: Admin role required");
  }
};
