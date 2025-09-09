import React, { useState } from "react";

interface MessagesProps {
  currentUserId: string;
}

// Local-only chat type (simplified)
type ChatMessage = {
  id: number;
  sender: string;
  text: string;
};

const initialMessages: ChatMessage[] = [
  { id: 1, sender: "Alice", text: "Hey, excited for our tee time!" },
  { id: 2, sender: "You", text: "Same here! Let’s meet 15 mins early." },
];

export default function Messages({ currentUserId }: MessagesProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "You", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl shadow-md flex flex-col max-w-lg mx-auto h-96">
      <h2 className="text-lg font-semibold mb-3">
        Messages for {currentUserId}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`px-3 py-2 rounded-lg max-w-xs break-words ${
              m.sender === "You"
                ? "bg-green-500 text-white self-end ml-auto"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 self-start"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
