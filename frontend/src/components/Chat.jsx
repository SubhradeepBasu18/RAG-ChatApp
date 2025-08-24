import { useState } from "react";
import { sendQuery } from "../utils/api.js";

function Chat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);

    try {
      setLoading(true);
      const response = await sendQuery(query);
      const botReply = response.data.data.response;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-800 text-white">
      {/* Header */}
      <p className="text-xl font-semibold p-4 border-b border-zinc-700">Chat</p>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <h1 className="text-xl text-gray-400 text-center mt-20 tracking-wider">
            Add a Source to get Started
          </h1>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[75%] ${
              msg.sender === "user"
                ? "bg-zinc-900 ml-auto text-right"
                : "bg-zinc-700 mr-auto text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-lg bg-zinc-800 w-fit animate-pulse">
            Typing...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="relative p-4 border-t border-zinc-700">
        <input
          type="text"
          placeholder="Ask anything"
          className="w-full p-3 pr-16 border border-zinc-600 rounded-lg bg-zinc-900 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="absolute right-6 bottom-6 p-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-500 disabled:opacity-50"
          onClick={handleAsk}
          disabled={loading || query.trim() === ""}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
