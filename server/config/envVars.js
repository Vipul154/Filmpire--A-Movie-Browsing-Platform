import dotenv from "dotenv";
dotenv.config();
export const envVars = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  API_URL: process.env.API_URL,
};
