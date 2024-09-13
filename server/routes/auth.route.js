import express from "express";
import {
  authCheck,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck", protectedRoute, authCheck);

export default router;
