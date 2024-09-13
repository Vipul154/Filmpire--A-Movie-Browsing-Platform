import express from "express";
const router = express.Router()
import { getTrendingTv, getSimilarTvs, getTvsByCategory, getTvDetails, getTvTrailers } from "../controllers/tv.controller.js";



router.get("/trending", getTrendingTv)
router.get("/:id/trailers", getTvTrailers)
router.get("/:id/details", getTvDetails)
router.get("/:id/similar", getSimilarTvs)
router.get("/:category", getTvsByCategory)

export default router;
