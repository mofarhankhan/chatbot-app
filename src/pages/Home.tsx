import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/login';
    setMessages([{ type: 'bot', text: '👋 Hello! I am your chatbot. Ask me anything!' }]);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: 'user', text: input }]);

    // setTimeout(() => {
    //   setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    // }, 400);

    setInput('');
  };

  const generateReply = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hi') || lower.includes('hello')) return '👋 Hello there! How can I help you today?';
    if (lower.includes('name')) return '🤖 I\'m your friendly AI assistant!';
    if (lower.includes('help')) return '🛠️ Sure! I can help you with anything you need.';
    if (lower.includes('time')) return `⏰ Current Time: ${new Date().toLocaleTimeString()}`;
    if (lower.includes('date')) return `📅 Today's date: ${new Date().toLocaleDateString()}`;
    if (lower.includes('joke')) return '😄 Why don’t programmers like nature? It has too many bugs!';
    if (lower.includes('bye')) return '👋 Have a great day!';
    if (lower.includes('thanks') || lower.includes('thank you')) return '🙏 You\'re welcome!';
    return `🤔 You said: "${msg}"`;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🏠 Home</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/chat')}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
          >
            Go to Chat 💬
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg"
          >
            Toggle Theme 🌗
          </button>
          <button
            onClick={() => setShowProfile((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
          >
            Profile 👤
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
          >
            Logout 🚪
          </button>
        </div>
      </div>

      {!showProfile && (
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
          <div className="flex-1 overflow-y-auto space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-xs ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white self-end'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">👤 User Profile</h2>
          <p className="text-gray-600 dark:text-gray-300">📧 Email: user@example.com</p>
          <p className="text-gray-600 dark:text-gray-300">🔒 Status: Logged In</p>
        </div>
      )}
    </div>
  );
}