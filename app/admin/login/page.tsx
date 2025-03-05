"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const VALID_USERS = {
  'abigail': '2470+dgf7ue',
  'samuel': '9983+dgf7ue',
  'michael': '9045+dgf7ue',
  'john': '1103+dgf7ue',
  'daniel': '3776+dgf7ue',
  'delle': '9985+dgf7ue',
  'maureen': '2205+dgf7ue',
  'joshua': '657891+dgf7ue'
} as const;

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const lowercaseUsername = username.toLowerCase();

    if (VALID_USERS[lowercaseUsername as keyof typeof VALID_USERS] === password) {
      try {
        sessionStorage.setItem('adminUser', lowercaseUsername);
        router.push('/admin/documents');
      } catch (err) {
        setError('An error occurred during login');
        console.error('Login error:', err);
      }
    } else {
      setError('Invalid username or password');
    }
  };

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until client-side
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <div className="flex justify-center items-center">
  <Image src="/roya.png" alt="Logo" width={100} height={100} />
</div>
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm" role="alert">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
} 