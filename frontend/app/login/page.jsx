'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth, roleHome } from '../providers/AuthProvider';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next');

  const onSelect = (role) => {
    login(role);
    const dest = next || roleHome(role);
    router.replace(dest);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign in</h1>
        <p className="text-white/80 text-sm mb-6 text-center">Choose your role to continue</p>

        <div className="grid gap-3">
          <button onClick={() => onSelect('patient')} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">Patient</button>
          <button onClick={() => onSelect('doctor')} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white">Doctor</button>
          <button onClick={() => onSelect('hospital')} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white">Hospital</button>
          <button onClick={() => onSelect('pharmacy')} className="px-4 py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 text-white">Pharmacy</button>
        </div>
      </div>
    </div>
  );
}

