# RAG-ChatApp

A robust, end-to-end chat application leveraging Retrieval-Augmented Generation (RAG) for intelligent conversations. This repository demonstrates how to combine traditional chat interfaces with advanced retrieval-powered LLMs to provide smart, context-aware responses.

## Features

- **Retrieval-Augmented Generation**: Integrates an LLM with a document retriever for context-aware, grounded answers.
- **Scalable Architecture**: Clean separation of backend API and data storage.
- **Extensible Document Store**: Easily plug in different sources (files, databases, web pages) for retrieval.
- **Open Source and Customizable**: Built for learning and rapid prototyping.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: QdrantDB
- **LLM Integration**: OpenAI API or compatible LLM provider

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Gemini API key (or compatible LLM provider)

### Installation

```bash
git clone https://github.com/SubhradeepBasu18/RAG-ChatApp.git
cd RAG-ChatApp
cd backend && npm run dev
```

### Configuration

1. **Environment Variables**: Create a `.env` file in the backend folder and set:
    ```
    GEMINI_API_KEY=your-openai-api-key
    ```

### Running the App

```bash
# In backend/
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

## Usage

- Register or log in with your credentials.
- Start chatting! The RAG pipeline will retrieve relevant context and generate responses grounded in your document store.


## Contributing

Contributions welcome! Please open issues and pull requests for bugs, features, or documentation improvements.

## License

This project is licensed under the MIT License.

---
