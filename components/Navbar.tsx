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
    setDropdownOpen(false);
  }, [pathname]);

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
    <nav className="border-b-4 border-foreground bg-background sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-foreground hover:bg-accent px-2 py-1 border-2 border-transparent hover:border-foreground transition-all">
            ResumeSync!
          </Link>
          
          <div className="flex items-center space-x-3 sm:space-x-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-bold uppercase tracking-wide px-3 py-1.5 border-2 border-transparent hover:border-foreground hover:bg-accent transition-all ${
                    pathname.startsWith('/dashboard') 
                      ? 'bg-accent text-black border-foreground' 
                      : 'text-foreground'
                  }`}
                >
                  Dashboard
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-1.5 border-2 border-foreground bg-card-bg hover:bg-accent transition-all font-bold text-sm uppercase shadow-[2px_2px_0px_0px_var(--border)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_var(--border)]"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent border border-foreground flex items-center justify-center text-black">
                      <UserIcon className="w-3 h-3" />
                    </div>
                    <span className="text-foreground capitalize max-w-[80px] sm:max-w-none truncate">{userDisplayName}</span>
                    <ChevronDown className={`w-4 h-4 text-foreground transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-card-bg border-4 border-foreground shadow-[4px_4px_0px_0px_var(--border)] py-0 z-50 overflow-hidden font-bold">
                      <div className="px-4 py-3 border-b-2 border-foreground bg-accent text-black">
                        <p className="text-[10px] tracking-widest uppercase mb-1 font-black opacity-80">User Email</p>
                        <p className="text-sm truncate font-extrabold">{user.email}</p>
                      </div>
                      
                      <Link 
                        href="/history"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-foreground hover:bg-accent border-b-2 border-foreground transition-all"
                      >
                        <History className="w-4 h-4" />
                        <span className="uppercase tracking-wider">Analysis History</span>
                      </Link>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500 hover:text-white transition-all text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="uppercase tracking-wider font-extrabold">Log out</span>
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
                    className="text-sm font-bold uppercase tracking-wide px-3 py-1.5 border-2 border-transparent hover:border-foreground hover:bg-accent transition-all text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-bold uppercase tracking-wide bg-accent text-black px-4 py-2 border-2 border-foreground shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
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
