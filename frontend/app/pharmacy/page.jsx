'use client';

import { Protected } from '../providers/AuthProvider';

export default function PharmacyPage() {
  return (
    <Protected allowedRoles={["pharmacy"]}>
      <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-6">
        <h1 className="text-5xl font-bold text-white mb-6">💊 Pharmacy Portal</h1>
        <p className="text-white/80 mb-8">Manage inventory, prescriptions, and dispensing workflows.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">📦 Inventory</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">📝 Prescriptions</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">🚚 Orders</button>
        </div>
      </div>
    </Protected>
  );
}

