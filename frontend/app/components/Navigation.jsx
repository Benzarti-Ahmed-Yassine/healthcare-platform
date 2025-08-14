'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for saved dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
      if (JSON.parse(saved)) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark');
  };

  const allNavItems = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-medical-500 to-medical-600',
      description: 'Overview & Analytics'
    },
    { 
      name: 'Doctor', 
      href: '/doctor', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zM12 14v7m0 0H5m7 0h7" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-emerald-600',
      description: 'Doctor Portal'
    },
    { 
      name: 'Healthcare', 
      href: '/healthcare', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      gradient: 'from-health-500 to-health-600',
      description: 'Medical Records & Care'
    },
    { 
      name: 'Patient Portal', 
      href: '/patient', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: 'from-care-500 to-care-600',
      description: 'Personal Health Dashboard'
    },
    { 
      name: 'Hospital', 
      href: '/hospital', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 7-7 7 7 2 2v7a2 2 0 01-2 2h-3v-5H8v5H5a2 2 0 01-2-2v-7z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600',
      description: 'Hospital Portal'
    },
    { 
      name: 'Logistics', 
      href: '/logistics', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      gradient: 'from-warning-500 to-warning-600',
      description: 'Supply Chain & Tracking'
    },
    { 
      name: 'Pharmacy', 
      href: '/pharmacy', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 11h8M8 15h8M5 7h.01M5 11h.01M5 15h.01" />
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Pharmacy Portal'
    },
    { 
      name: 'Security', 
      href: '/security', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: 'from-safety-500 to-safety-600',
      description: 'Security & Compliance'
    },
  ];

  const visibleNavItems = allNavItems.filter((item) => {
    if (!user) {
      return ['/', '/security', '/patient'].includes(item.href);
    }
    switch (user.role) {
      case 'patient':
        return ['/', '/patient', '/security'].includes(item.href);
      case 'doctor':
        return ['/', '/doctor', '/healthcare', '/security'].includes(item.href);
      case 'hospital':
        return ['/', '/hospital', '/healthcare', '/logistics', '/security'].includes(item.href);
      case 'pharmacy':
        return ['/', '/pharmacy', '/logistics', '/security'].includes(item.href);
      default:
        return ['/', '/security'].includes(item.href);
    }
  });

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-strong border-b border-slate-200/50 dark:border-slate-700/50' 
        : 'backdrop-blur-md bg-white/70 dark:bg-slate-900/70 shadow-medium border-b border-slate-200/30 dark:border-slate-700/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="w-12 h-12 bg-gradient-medical rounded-2xl flex items-center justify-center mr-4 
                            shadow-medical group-hover:shadow-lg transition-all duration-300 
                            group-hover:scale-105 animate-breathe">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 
                             dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent 
                             group-hover:from-medical-600 group-hover:to-medical-800 
                             dark:group-hover:from-medical-400 dark:group-hover:to-medical-200 
                             transition-all duration-300">
                  Healthcare Platform
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 
                           group-hover:text-medical-600 dark:group-hover:text-medical-400 
                           transition-colors duration-300">
                  Powered by Hedera
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative flex items-center px-4 py-2.5 rounded-2xl font-medium 
                              transition-all duration-300 focus:outline-none focus:ring-4 
                              focus:ring-medical-200 dark:focus:ring-medical-800 ${
                      isActive
                        ? 'bg-medical-100 dark:bg-medical-900/50 text-medical-800 dark:text-medical-200 shadow-medical'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-medical-700 dark:hover:text-medical-300'
                    }`}
                  >
                    <span className={`mr-3 transition-all duration-300 ${
                      isActive ? 'text-medical-600 dark:text-medical-400 animate-pulse-soft' : 'group-hover:scale-110'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="whitespace-nowrap">{item.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                                    w-6 h-1 bg-gradient-to-r from-medical-500 to-medical-600 
                                    rounded-full animate-scale-in" />
                    )}
                  </Link>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                                px-3 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 
                                text-sm rounded-xl opacity-0 group-hover:opacity-100 
                                pointer-events-none transition-all duration-300 z-50 whitespace-nowrap">
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                                  w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* System Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 
                          bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <div className="status-healthy" title="System Healthy" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                All Systems Operational
              </span>
            </div>

            {/* Notifications */}
            <button className="relative p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 
                             text-slate-600 dark:text-slate-400 hover:bg-slate-200 
                             dark:hover:bg-slate-700 hover:text-medical-600 
                             dark:hover:text-medical-400 transition-all duration-200 
                             focus:outline-none focus:ring-4 focus:ring-medical-200 
                             dark:focus:ring-medical-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 17h5l-5 5v-5zM12 17.75A7.25 7.25 0 105.25 10.5" />
              </svg>
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-safety-500 rounded-full 
                            border-2 border-white dark:border-slate-900 animate-pulse" />
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 
                       text-slate-600 dark:text-slate-400 hover:bg-slate-200 
                       dark:hover:bg-slate-700 hover:text-medical-600 
                       dark:hover:text-medical-400 transition-all duration-200 
                       focus:outline-none focus:ring-4 focus:ring-medical-200 
                       dark:focus:ring-medical-800 group"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative w-5 h-5">
                <svg className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg className={`absolute inset-0 transition-all duration-300 ${
                  isDarkMode ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </button>

            {/* User menu */}
            <div className="relative group">
              <button className="flex items-center space-x-3 p-2 rounded-2xl 
                               bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 
                               dark:hover:bg-slate-700 transition-all duration-200 
                               focus:outline-none focus:ring-4 focus:ring-medical-200 
                               dark:focus:ring-medical-800">
                <div className="w-10 h-10 bg-gradient-medical rounded-2xl flex items-center 
                              justify-center shadow-medical group-hover:shadow-lg 
                              transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {user ? user.name : 'Guest'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user ? user.role : 'not signed in'}
                  </p>
                </div>
                <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 
                               group-hover:text-slate-600 dark:group-hover:text-slate-300 
                               transition-colors duration-200" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {user ? (
                <button onClick={logout} className="ml-3 px-3 py-2 rounded-xl bg-red-500/20 text-red-200 border border-red-500/30 hover:bg-red-500/30 transition">
                  Logout
                </button>
              ) : (
                <Link href="/login" className="ml-3 px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 hover:bg-emerald-500/30 transition">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 
                       text-slate-600 dark:text-slate-400 hover:bg-slate-200 
                       dark:hover:bg-slate-700 hover:text-medical-600 
                       dark:hover:text-medical-400 transition-all duration-200 
                       focus:outline-none focus:ring-4 focus:ring-medical-200 
                       dark:focus:ring-medical-800"
              aria-label="Toggle mobile menu"
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-4 pb-6 space-y-2 border-t border-slate-200/50 
                        dark:border-slate-700/50 bg-gradient-to-b from-white/50 
                        to-slate-50/50 dark:from-slate-900/50 dark:to-slate-800/50 
                        backdrop-blur-xl rounded-b-3xl">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3.5 rounded-2xl font-medium 
                            transition-all duration-300 group ${
                    isActive
                      ? 'bg-medical-100 dark:bg-medical-900/50 text-medical-800 dark:text-medical-200 shadow-medical'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-medical-700 dark:hover:text-medical-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className={`mr-4 transition-all duration-300 ${
                    isActive ? 'text-medical-600 dark:text-medical-400' : 'group-hover:scale-110'
                  }`}>
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-medical-500 rounded-full animate-pulse-soft" />
                  )}
                </Link>
              );
            })}
            
            {/* Mobile User Section */}
            <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center px-4 py-3 rounded-2xl bg-slate-100 
                            dark:bg-slate-800">
                <div className="w-12 h-12 bg-gradient-medical rounded-2xl 
                              flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-200">
                    {user ? user.name : 'Guest'}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {user ? user.role : 'not signed in'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
