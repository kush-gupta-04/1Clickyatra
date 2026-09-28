import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "premium_luxury_travel_jwt_secret_key_2026",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );

  // Set Cookie for secure transport (optional, frontend can also store in localStorage)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days
  });

  return token;
};

export default generateToken;
