import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, BotMessageSquare } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location.href = '/login';
    setMessages([{ type: 'bot', text: '💬 Hi! I\'m your AI assistant. Ask me anything!' }]);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { type: 'user', text: input }]);
    setInput('');

    try {
      const reply = await fetchDummyApi(input);
      setMessages((prev) => [...prev, { type: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { type: 'bot', text: '❌ Error getting response.' }]);
    }
  };

  const fetchDummyApi = async (msg: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        const lower = msg.toLowerCase();
        if (lower.includes('hello') || lower.includes('hi')) resolve('👋 Hello! What can I do for you?');
        else if (lower.includes('how are you')) resolve('😊 I\'m just code, but I\'m feeling smart today!');
        else if (lower.includes('what are you doing')) resolve('🤖 Just waiting for your next brilliant question!');
        else if (lower.includes('address')) resolve('📍 I live in the cloud ☁️.');
        else if (lower.includes('help')) resolve('🛠️ I can help with general queries or chat!');
        else if (lower.includes('time')) resolve(`⏰ It's currently ${new Date().toLocaleTimeString()}`);
        else if (lower.includes('date')) resolve(`📅 Today is ${new Date().toLocaleDateString()}`);
        else if (lower.includes('joke')) resolve('😂 Why did the computer get cold? Because it left its Windows open!');
        else if (lower.includes('name')) resolve('🤖 I\'m GPT-ChatBot, your virtual assistant.');
        else resolve(`🤖 You said: "${msg}"`);
      }, 800);
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">💬 Chat</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
          >
            Go to Home 🏠
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg"
          >
            Toggle Theme 🌗
          </button>
        </div>
      </div>

      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar flex flex-col justify-end">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${msg.type === 'user' ? 'self-end' : 'self-start'}`}
            >
              {msg.type === 'bot' && <BotMessageSquare className="w-6 h-6 text-blue-500" />}
              {msg.type === 'user' && <UserCircle2 className="w-6 h-6 text-gray-400" />}
              <div
                className={`p-3 rounded-lg max-w-[70%] whitespace-pre-wrap text-sm md:text-base ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {msg.text}
              </div>
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
    </div>
  );
}
