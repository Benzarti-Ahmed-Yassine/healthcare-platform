'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, roleHome } from './providers/AuthProvider';
import Dashboard from './components/Dashboard';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace(roleHome(user.role));
    }
  }, [user, router]);

  // If not logged in, show dashboard with a CTA to login via nav
  return <Dashboard />;
}
