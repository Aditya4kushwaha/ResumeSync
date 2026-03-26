'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { User as UserIcon, LogOut, History, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
    setDropdownOpen(false); // Close dropdown on navigation
  }, [pathname]); // Refetch on route change to catch login/logout events

  // Close dropdown clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const userDisplayName = user?.email?.split('@')[0] || 'User';

  return (
    <nav className="border-b border-emerald-900/50 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            ResumeSync
          </Link>
          <div className="flex space-x-4 items-center">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                    pathname.startsWith('/dashboard') ? 'text-emerald-400' : 'text-gray-300'
                  }`}
                >
                  Dashboard
                </Link>

                <div className="h-5 w-px bg-gray-700 mx-2" />
                
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-800 bg-black/40 hover:bg-gray-800 transition-colors focus:outline-none"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-900/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                      <UserIcon className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium text-gray-300 capitalize">{userDisplayName}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-50 overflow-hidden transform opacity-100 scale-100 transition-all origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-800 mb-1 bg-black/20">
                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mb-1">Signed in as</p>
                        <p className="text-sm text-gray-300 truncate font-medium">{user.email}</p>
                      </div>
                      
                      <Link 
                        href="/history"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-emerald-400 border-l-2 border-transparent hover:border-emerald-500 transition-all"
                      >
                        <History className="w-4 h-4" />
                        <span>Analysis History</span>
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-3 px-4 py-2.5 text-sm text-red-400 hover:bg-gray-800 border-l-2 border-transparent hover:border-red-500 transition-all text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              !loading && (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-md hover:bg-emerald-500 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
