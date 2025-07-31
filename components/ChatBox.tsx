import React, { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBoxProps {
  initialMessages?: Message[];
  onSend?: (message: string) => Promise<string>;
}

const ChatBox: React.FC<ChatBoxProps> = ({ initialMessages = [], onSend }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    if (onSend) {
      setLoading(true);
      try {
        const reply = await onSend(userMessage.content);
        const assistantMessage: Message = { role: 'assistant', content: reply };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        const assistantMessage: Message = {
          role: 'assistant',
          content: 'Entschuldigung, es ist ein Fehler aufgetreten.',
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="h-64 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-sm ${
              msg.role === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-100 self-start mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">GPT schreibt…</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gib dein Feedback ein…"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Senden
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
