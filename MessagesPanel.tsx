import React, { useState, useEffect } from "react";
import { api } from "../mock-api";
import { Message, User } from "../types";

export default function MessagesPanel({ currentUserId }: { currentUserId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [text, setText] = useState("");
  const [to, setTo] = useState<string>("");

  useEffect(() => {
    api.getMessages().then(setMessages);
    api.getUsers().then(setUsers);
  }, []);

  const send = async () => {
    if (!to) return alert("Select recipient");
    if (!text.trim()) return alert("Enter a message");

    const m = await api.sendMessage({ sender: currentUserId, recipient: to, text });
    setMessages((prev) => [...prev, m]);
    setText("");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Messages</h4>

      <div className="mt-3 space-y-2 max-h-48 overflow-auto">
        {messages.map((m) => (
          <div
            key={m.id}
            className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {users.find((u) => u.id === m.sender)?.name ?? m.sender} →{" "}
              {users.find((u) => u.id === m.recipient)?.name ?? m.recipient}
            </div>
            <div className="text-sm text-gray-800 dark:text-gray-200">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">Select recipient</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Write a message"
        />

        <button
          onClick={send}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-shadow shadow-sm hover:shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
