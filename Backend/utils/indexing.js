import { configDotenv } from "dotenv";
configDotenv({ quiet: true });
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"
import {QdrantVectorStore } from '@langchain/qdrant'

async function main(fileUrl) {
    const loader = new PDFLoader(fileUrl);
    const docs = await loader.load();

    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_GEMINI_KEY,
        model: "models/embedding-001"
    })

    try {

        const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
            url: 'http://localhost:6333',
            collectionName: "notebookllm",
        });

        console.log('Embeddings stored in DB!');
    } catch (error) {
        console.error('Error while upserting:', error);
    }
}

// main();
export default main;
