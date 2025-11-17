import { Router } from "express";
import { controllers } from "../controllers/summerizerController";

const router = Router();

const { controller, getProductReviews, summerizeReviews, getProducts } = controllers;

// Health check
router.get('/api/health', controller); // ✅ Changed from /ask

// Summarize reviews (fixed spelling)
router.post("/api/products/:id/summarize", summerizeReviews); // ✅ summarize not summerise

// Get product reviews
router.get("/api/products/:id/reviews", getProductReviews); // ✅ plural /products, /reviews

// Get all products
router.get("/api/products", getProducts);

export default router;