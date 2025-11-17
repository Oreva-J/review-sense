import type { Request, Response } from "express";
import { dataReview, getProduct, getSummary } from "../db/database";
import { summeriseService } from "../services/summerizerService";

const controller = (req: Request, res: Response) => {
    res.json({ message: "Summerizer API is running" });
}

const summerizeReviews = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" }); // ✅ Added return
        }

        const isProduct = await getProduct(productId);
        if (!isProduct) {
            return res.status(404).json({ error: "Product not found" }); // ✅ 404 not 400
        }

        const reviews = await dataReview(productId, 1);
        if (!reviews || reviews.length === 0) {
            return res.status(400).json({ error: "No reviews to summarize" }); // ✅ Added return
        }

        const summerisedReview = await summeriseService(productId);
        
        return res.json({ summary: summerisedReview }); // ✅ Return structured data
    } catch (error) {
        console.error("Error summarizing reviews:", error);
        return res.status(500).json({ error: "Failed to summarize reviews" });
    }
}

const getProductReviews = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" }); // ✅ Added return
        }
        
        const product = await getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" }); // ✅ Added return
        }

        const reviews = await dataReview(productId);
        const summary = await getSummary(productId);

        return res.json({ 
            product: {
                id: product.id,
                name: product.name,
                description: product.description
            },
            reviews, 
            summary 
        }); // ✅ Added return
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return res.status(500).json({ error: "Failed to fetch product reviews" });
    }
}

export const controllers = {
    controller,
    getProductReviews,
    summerizeReviews
}