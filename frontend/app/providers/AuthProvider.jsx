'use client';

import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth:user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (role, name = '') => {
    const newUser = { role, name: name || (role === 'doctor' ? 'Dr. Smith' : role === 'patient' ? 'John Smith' : role === 'hospital' ? 'City General Hospital' : role === 'pharmacy' ? 'PharmaCorp' : 'User') };
    setUser(newUser);
    localStorage.setItem('auth:user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth:user');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Client component guard that redirects to /login if unauthenticated or role not allowed
export function Protected({ allowedRoles, children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      // If role not allowed, send to their own home
      const home = roleHome(user.role);
      router.replace(home);
    }
  }, [user, allowedRoles, router, pathname]);

  if (!user) return null; // avoid flashing content
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return null;
  return children;
}

export function roleHome(role) {
  switch (role) {
    case 'doctor':
      return '/doctor';
    case 'patient':
      return '/patient';
    case 'hospital':
      return '/hospital';
    case 'pharmacy':
      return '/pharmacy';
    default:
      return '/';
  }
}

