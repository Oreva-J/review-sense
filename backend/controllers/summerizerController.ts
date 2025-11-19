import type { Request, Response } from "express";
import { dataReview, getAllProducts, getProduct, getSummary, prisma } from "../db/database";
import { summeriseService } from "../services/summerizerService";

const controller = (req: Request, res: Response) => {
    res.json({ 
      status: 'ok',
      message: "ReviewSense API is running",
      endpoints: {
        products: '/api/products',
        productReviews: '/api/products/:id/reviews',
        summarize: '/api/products/:id/summarize'
      }
    });
}

// Get all products
const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        return res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" });
    }
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

// Create a new product
const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required" });
        }

        const product = await prisma.product.create({
            data: {
                name,
                description: description || null,
                price: parseFloat(price)
            }
        });
        
        return res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}

// Update a product
const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        const { name, description, price } = req.body;
        
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description: description || null,
                price: price ? parseFloat(price) : undefined
            }
        });
        
        return res.json(product);
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product" });
    }
}

// Delete a product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        await prisma.product.delete({
            where: { id: productId }
        });
        
        return res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product" });
    }
}

// Create a review
const createReview = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.id);
        const { author, rating, comment } = req.body;
        
        if (isNaN(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        if (!author || !rating) {
            return res.status(400).json({ error: "Author and rating are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        // Check if product exists
        const product = await getProduct(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const review = await prisma.review.create({
            data: {
                author,
                rating: Number(rating),
                comment: comment || null,
                productID: productId
            }
        });
        
        return res.status(201).json(review);
    } catch (error) {
        console.error("Error creating review:", error);
        return res.status(500).json({ error: "Failed to create review" });
    }
}

export const controllers = {
    controller,
    getProductReviews,
    getProducts,
    summerizeReviews,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview
}