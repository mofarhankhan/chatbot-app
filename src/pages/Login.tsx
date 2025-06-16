import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [agree, setAgree] = useState(false);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      if (user.email === email && user.pass === pass) {
        localStorage.setItem('token', 'dummy-token');
        setResponse('✅ Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setResponse('❌ Wrong email or password');
      }
    } else {
      setResponse('❌ No user found. Please register.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-500 dark:bg-gray-900 px-4">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Welcome Back 👋</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Login to your account</p>

        <input
          type="email"
          placeholder="Email"
          className="mb-3 px-4 py-2 border rounded w-full outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3 px-4 py-2 border rounded w-full outline-none"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <label className="text-sm flex items-center gap-2 mb-3">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} /> I agree to the Terms
        </label>

        {response && <p className="text-sm text-center text-red-500 mb-3">{response}</p>}

        <button
          disabled={!agree}
          className={`py-2 px-4 rounded w-full transition ${agree ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-200 text-white cursor-not-allowed'}`}
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
