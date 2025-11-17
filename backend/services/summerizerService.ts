import { dataReview, getSummary, saveSummary } from "../db/database";
import { llmClient } from "../llm/client";
import template from "../llm/prompts/summerizeReviewPrompt.txt"; // ✅ Fixed path

export const summeriseService = async (productId: number): Promise<string> => {
    try {
        // Check if summary exists and is not expired
        const checkSummary = await getSummary(productId);
        if (checkSummary) {
            return checkSummary;
        }

        // Get recent reviews
        const limit: number = 10;
        const reviews = await dataReview(productId, limit);
        
        if (!reviews || reviews.length === 0) {
            throw new Error("No reviews available to summarize");
        }

        // Join reviews and create prompt
        const joinedReviews = reviews
            .filter(r => r.comment) // ✅ Filter out null comments
            .map(r => `- ${r.comment}`)
            .join('\n');

        const prompt: string = template.replace("{{reviews}}", joinedReviews);

        // Generate summary using LLM
        const response = await llmClient({ prompt });
        
        if (!response || !response.text) {
            throw new Error("Failed to generate summary from LLM");
        }

        // Save summary
        await saveSummary(productId, response.text);

        return response.text;
    } catch (error) {
        console.error(`Error in summeriseService for product ${productId}:`, error);
        throw error; // Re-throw to be handled by controller
    }
}