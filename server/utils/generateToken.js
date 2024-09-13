import jwt from "jsonwebtoken";
import { envVars } from "../config/envVars.js";

const generateTokenAndSetCookie = async (userId, res) => {
  const token = jwt.sign({ userId }, envVars.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-filmpire", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    // sameSite : "strict",
    secure: true,
  });

  return token;
};

export { generateTokenAndSetCookie };
