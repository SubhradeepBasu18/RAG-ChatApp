import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
import OpenAI from "openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"

const openai = new OpenAI({
    apiKey: process.env.GOOGLE_GEMINI_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

async function chat(userQuery) {
    // Accept user query
    // const userQuery = 'Can you tell me how to install express using npm?';
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_GEMINI_KEY,
        model: "models/embedding-001"
    })
    
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: 'http://localhost:6333',
        collectionName: "notebookllm",
      });

    const vectorRetriever = vectorStore.asRetriever({
        k: 3,
    })

    const relevantChunks = await vectorRetriever.invoke(userQuery)

    try {
        const SYSTEM_PROMPT = `You are an AI assistant that answers questions based on the provided context available to you from a PDF file with the content and page number.
        Only answer based on the available context from file.
        Use this data to reply smarter. 
        
        Context:
        ${JSON.stringify(relevantChunks)}`;

        const response = await openai.chat.completions.create({
            model: 'gemini-2.0-flash',
            messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userQuery }
            ],
        });
        

        console.log('Response:', response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        console.log("Search or Gemini query failed: ", error);
    }
}

export default chat;
