'use client';

import { Protected } from '../providers/AuthProvider';

export default function DoctorPage() {
  return (
    <Protected allowedRoles={["doctor"]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-600 p-6">
        <h1 className="text-5xl font-bold text-white mb-6">👨‍⚕️ Doctor Portal</h1>
        <p className="text-white/80 mb-8">Manage patients, appointments, and medical records.</p>
        <div className="grid md:grid-cols-3 gap-6">
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">🗓️ Appointments</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">📋 Records</button>
          <button className="p-6 rounded-2xl bg-white/10 text-white border border-white/20">💬 Messages</button>
        </div>
      </div>
    </Protected>
  );
}

