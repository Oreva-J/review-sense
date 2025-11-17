import { PrismaClient, type Review, type Product, } from '@prisma/client'
import dayjs from "dayjs";
// import { PrismaClient } from "../generated/prisma/client";

export const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const saveSummary = async (productId: number, summary: string): Promise<void> => {
    try {
        const now = new Date();
        const expireAt = dayjs().add(7, 'days').toDate();
        
        await prisma.reviewSummary.upsert({
            where: { productID: productId },
            create: {
                content: summary,
                generatedAt: now,
                expireAt,
                productID: productId
            },
            update: {
                content: summary,
                expireAt,
                generatedAt: now
            }
        });
    } catch (error) {
        console.error(`Error saving summary for product ${productId}:`, error);
        throw error;
    }
}

export const getProduct = async (productId: number): Promise<Product | null> => {
    try {
        return await prisma.product.findUnique({ 
            where: { id: productId } 
        });
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
    }
}

export const dataReview = async (productId: number, limit?: number): Promise<Review[]> => {
    try {
        return await prisma.review.findMany({
            where: { productID: productId },
            orderBy: { date: "desc" },
            take: limit
        });
    } catch (error) {
        console.error(`Error fetching reviews for product ${productId}:`, error);
        throw error;
    }
}

export const getSummary = async (productID: number): Promise<string | null> => {
    try {
        const summary = await prisma.reviewSummary.findFirst({
            where: {
                AND: [
                    { productID },
                    { expireAt: { gt: new Date() } }
                ]
            }
        });
        return summary ? summary.content : null;
    } catch (error) {
        console.error(`Error fetching summary for product ${productID}:`, error);
        throw error;
    }
}

// Graceful shutdown
process.on('beforeExit', async () => {
    await prisma.$disconnect();
});
