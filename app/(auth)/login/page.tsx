'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[75vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-card-bg border-4 border-foreground p-8 rounded-sm shadow-[8px_8px_0px_0px_var(--border)]">
        <div className="mb-8">
          <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm font-bold text-muted uppercase tracking-wider">
            Sign in to access your dashboard
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-sm text-sm font-bold">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground block mb-1">Email Address</label>
              <input
                type="email"
                required
                className="neo-input w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-foreground block mb-1">Password</label>
              <input
                type="password"
                required
                className="neo-input w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="neo-btn neo-btn-accent w-full py-3.5 text-base border-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          <div className="text-sm text-center font-bold text-muted uppercase tracking-wide">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#8B5CF6] underline font-extrabold hover:text-foreground">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
