import express from "express";
import authRoutes from "./routes/auth.route.js";
import { envVars } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import { protectedRoute } from "./middleware/protectedRoute.middleware.js";
import cookieParser from "cookie-parser";
import searchRoutes from "./routes/search.route.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Resolving dirname for esmodules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = envVars.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); //will allow us to parse req.body
app.use(cookieParser()); //will allow us to parse cookies using req.cookies()

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoute, movieRoutes);
app.use("/api/v1/tv", protectedRoute, tvRoutes);
app.use("/api/v1/search", protectedRoute, searchRoutes);

if (envVars.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at port : http://localhost:${PORT}`);
  connectDB();
});
