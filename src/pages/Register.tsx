
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !pass || !phone || !name) {
      setResponse('❌ Please fill all fields');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email, pass, phone, name }));
    setResponse('✅ Registered successfully! Redirecting...');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-500 dark:bg-gray-900 px-4">
      <div className="p-8 bg-gray-300 dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">Join Us 🚀</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Create your free account</p>

        <input
          type="text"
          placeholder="Full Name"
          className="mb-3 px-4 py-2 border rounded w-full outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Phone number"
          className="mb-3 px-4 py-2 border rounded w-full outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="text-sm flex items-center gap-2 mb-3">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} /> I agree to the Terms
        </label>

        {response && <p className="text-sm text-center text-green-500 mb-3">{response}</p>}

        <button
          disabled={!agree}
          className={`py-2 px-4 rounded w-full transition ${agree ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-200 text-white cursor-not-allowed'}`}
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
