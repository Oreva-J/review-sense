import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export type Review = {
    id: number
    author: string
    rating: number
    comment: string
    date: string
    productID: number
}

export type Product = {
    id: number
    name: string
    description: string | null
    price: number
    createdAt: string
    updatedAt: string
    reviews?: { rating: number }[]
}

export type GetReviewResponse = {
    product: {
        id: number
        name: string
        description: string | null
        price: number
    }
    summary: string | null
    reviews: Review[]
}

export type GetSummaryResponse = {
    summary: string
}

export const api = {
    // Get all products
    async getProducts() {
        const { data } = await axios.get<Product[]>(`${API_URL}/api/products`);
        return data;
    },

    // Get product reviews
    async getProductReviews(productId: number) {
        const { data } = await axios.get<GetReviewResponse>(`${API_URL}/api/products/${productId}/reviews`);
        return data;
    },

    // Generate summary
    async generateSummary(productId: number) {
        const { data } = await axios.post<GetSummaryResponse>(`${API_URL}/api/products/${productId}/summarize`);
        return data;
    }
}