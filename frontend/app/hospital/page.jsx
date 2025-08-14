'use client';

import { Protected } from '../providers/AuthProvider';

export default function HospitalPage() {
  return (
    <Protected allowedRoles={["hospital"]}>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-600 p-6">
        <h1 className="text-5xl font-bold text-white mb-6">🏨 Hospital Portal</h1>
        <p className="text-white/80 mb-8">Manage departments, providers, bed capacity, and operations.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">👥 Providers</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">🛏️ Bed Capacity</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">📊 Reports</button>
        </div>
      </div>
    </Protected>
  );
}

