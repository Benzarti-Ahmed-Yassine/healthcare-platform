'use client';

import { useState } from 'react';

export default function HealthcarePage() {
  const [activeTab, setActiveTab] = useState('patients');
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    { id: 1, name: 'John Smith', age: 45, condition: 'Hypertension', lastVisit: '2024-01-15', status: 'Active', avatar: '👨‍⚕️' },
    { id: 2, name: 'Sarah Johnson', age: 32, condition: 'Diabetes Type 2', lastVisit: '2024-01-10', status: 'Active', avatar: '👩‍⚕️' },
    { id: 3, name: 'Michael Brown', age: 58, condition: 'Heart Disease', lastVisit: '2024-01-08', status: 'Follow-up', avatar: '👨‍⚕️' },
    { id: 4, name: 'Emily Davis', age: 28, condition: 'Asthma', lastVisit: '2024-01-12', status: 'Active', avatar: '👩‍⚕️' },
    { id: 5, name: 'Robert Wilson', age: 67, condition: 'Arthritis', lastVisit: '2024-01-05', status: 'Maintenance', avatar: '👨‍⚕️' },
  ];

  const appointments = [
    { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Check-up', status: 'Confirmed', priority: 'high' },
    { id: 2, patient: 'Sarah Johnson', time: '10:30 AM', type: 'Follow-up', status: 'Confirmed', priority: 'medium' },
    { id: 3, patient: 'Michael Brown', time: '02:00 PM', type: 'Consultation', status: 'Pending', priority: 'low' },
    { id: 4, patient: 'Emily Davis', time: '03:30 PM', type: 'Emergency', status: 'Urgent', priority: 'critical' },
  ];

  const medicalRecords = [
    { id: 1, patient: 'John Smith', type: 'Blood Test', date: '2024-01-15', status: 'Completed', doctor: 'Dr. Williams', icon: '🩸' },
    { id: 2, patient: 'Sarah Johnson', type: 'X-Ray', date: '2024-01-10', status: 'Pending Review', doctor: 'Dr. Garcia', icon: '📷' },
    { id: 3, patient: 'Michael Brown', type: 'ECG', date: '2024-01-08', status: 'Completed', doctor: 'Dr. Chen', icon: '💓' },
  ];

  const stats = {
    totalPatients: 1247,
    activeAppointments: 23,
    pendingRecords: 8,
    criticalAlerts: 2
  };

  const TabButton = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-6 py-3 rounded-2xl font-medium transition-all duration-300 backdrop-blur-md ${
        activeTab === tab
          ? 'bg-white/20 text-white shadow-lg border border-white/30'
          : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      <span className="mr-3 text-xl">{icon}</span>
      {label}
    </button>
  );

  const StatCard = ({ title, value, icon, color, gradient }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${gradient} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-white/70 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  const PatientCard = ({ patient }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-3xl">
          {patient.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{patient.name}</h3>
          <p className="text-white/70 text-sm">Age: {patient.age} • {patient.condition}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          patient.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          patient.status === 'Follow-up' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        }`}>
          {patient.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">Last Visit: {patient.lastVisit}</span>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
            📋 Records
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
            📅 Schedule
          </button>
        </div>
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{appointment.patient}</h3>
          <p className="text-white/70 text-sm">{appointment.type} • {appointment.time}</p>
        </div>
        <div className="text-right">
          <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
            appointment.status === 'Confirmed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
            appointment.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
            'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {appointment.status}
          </span>
          <div className="mt-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              appointment.priority === 'critical' ? 'bg-red-500/30 text-red-300' :
              appointment.priority === 'high' ? 'bg-orange-500/30 text-orange-300' :
              appointment.priority === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
              'bg-blue-500/30 text-blue-300'
            }`}>
              {appointment.priority}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button className="flex-1 px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
          🔄 Reschedule
        </button>
        <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
          ✅ Confirm
        </button>
      </div>
    </div>
  );

  const RecordCard = ({ record }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-3xl">
          {record.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{record.patient}</h3>
          <p className="text-white/70 text-sm">{record.type} • {record.doctor}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          record.status === 'Completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        }`}>
          {record.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">Date: {record.date}</span>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200">
          👁️ View
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-clip-text">
            🏥 Healthcare Portal
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Experience healthcare management like never before. Advanced patient care with cutting-edge technology designed to elevate your medical practice.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients, records, or appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-white/20 backdrop-blur-md text-white placeholder-white/60 rounded-2xl border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Patients" 
            value={stats.totalPatients.toLocaleString()} 
            icon="👥" 
            gradient="from-blue-500 to-cyan-500"
          />
          <StatCard 
            title="Active Appointments" 
            value={stats.activeAppointments} 
            icon="📅" 
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard 
            title="Pending Records" 
            value={stats.pendingRecords} 
            icon="📋" 
            gradient="from-yellow-500 to-orange-500"
          />
          <StatCard 
            title="Critical Alerts" 
            value={stats.criticalAlerts} 
            icon="🚨" 
            gradient="from-red-500 to-pink-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto">
          <TabButton tab="patients" label="Patients" icon="👥" />
          <TabButton tab="appointments" label="Appointments" icon="📅" />
          <TabButton tab="records" label="Medical Records" icon="📋" />
          <TabButton tab="analytics" label="Analytics" icon="📊" />
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'patients' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Patient Management</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                ➕ Add Patient
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map(patient => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Appointment Schedule</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                📅 New Appointment
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Medical Records</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg">
                📝 New Record
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalRecords.map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white mb-6">Healthcare Analytics</h2>
            
            {/* Analytics Overview */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Patient Demographics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Age 18-30</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <span className="text-white font-semibold">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Age 31-50</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-white font-semibold">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Age 51+</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                      <span className="text-white font-semibold">30%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Treatment Success Rate</h3>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray="85, 100"/>
                    </svg>
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">85%</span>
                    </div>
                  </div>
                  <p className="text-white/70">Overall Success Rate</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <button className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  📊 Generate Report
                </button>
                <button className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  📈 View Trends
                </button>
                <button className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}