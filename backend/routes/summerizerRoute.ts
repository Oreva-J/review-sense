import { Router } from "express";
import { controllers } from "../controllers/summerizerController";

const router = Router();

const { 
    controller, 
    getProducts, 
    getProductReviews, 
    summerizeReviews,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview
} = controllers;

// Health check
router.get('/api/health', controller);
router.get('/', controller);

// Products
router.get("/api/products", getProducts);
router.post("/api/products", createProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

// Reviews
router.get("/api/products/:id/reviews", getProductReviews);
router.post("/api/products/:id/reviews", createReview);

// Summarize
router.post("/api/products/:id/summarize", summerizeReviews);

export default router;