'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Healthcare', href: '/healthcare', icon: '🏥' },
    { name: 'Patient Portal', href: '/patient', icon: '👤' },
    { name: 'Logistics', href: '/logistics', icon: '🚚' },
    { name: 'Security', href: '/security', icon: '🔒' },
  ];

  return (
    <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <span className="text-white text-2xl font-bold">🏥</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-white">
                  Healthcare Platform
                </h1>
                <p className="text-sm text-white/70">
                  Powered by Hedera
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 backdrop-blur-md ${
                  pathname === item.href
                    ? 'bg-white/20 text-white shadow-lg border border-white/30'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200 border border-white/30 backdrop-blur-md"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* User menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-3 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200 border border-white/30 backdrop-blur-md">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <span className="hidden md:block text-sm font-medium">User</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200 border border-white/30 backdrop-blur-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-6 py-4 rounded-2xl text-base font-medium transition-all duration-200 backdrop-blur-md ${
                    pathname === item.href
                      ? 'bg-white/20 text-white shadow-lg border border-white/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-4 text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
