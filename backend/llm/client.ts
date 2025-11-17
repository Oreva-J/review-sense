import OpenAI from "openai";



const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type LlmInput = {
    prompt: string
    instructions?: string
    previousResponseId?: string
}

type Ouput ={
    id: string
    text: string
}

export const llmClient = async({prompt, instructions, previousResponseId}:LlmInput):Promise<Ouput>=>{

    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: ``,
        max_output_tokens: 500,
        input: prompt,
        previous_response_id: previousResponseId,

    });

    return({
        id: response.id,
        text: response.output_text
    })
}