'use client';

import { useState } from 'react';

export default function PatientPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const patientInfo = {
    name: 'John Smith',
    age: 45,
    id: 'P-2024-001',
    bloodType: 'O+',
    allergies: ['Penicillin', 'Shellfish'],
    emergencyContact: 'Sarah Smith (Wife) - (555) 123-4567',
    insurance: 'Blue Cross Blue Shield',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-01'
  };

  const medicalRecords = [
    { id: 1, type: 'Blood Test', date: '2024-01-15', doctor: 'Dr. Williams', status: 'Completed', icon: '🩸', description: 'Complete blood count and metabolic panel' },
    { id: 2, type: 'X-Ray', date: '2024-01-10', doctor: 'Dr. Garcia', status: 'Pending Review', icon: '📷', description: 'Chest X-ray for respiratory assessment' },
    { id: 3, type: 'ECG', date: '2024-01-08', doctor: 'Dr. Chen', status: 'Completed', icon: '💓', description: 'Electrocardiogram for heart rhythm analysis' },
    { id: 4, type: 'MRI Scan', date: '2024-01-05', doctor: 'Dr. Johnson', status: 'Scheduled', icon: '🔍', description: 'Brain MRI for neurological evaluation' },
  ];

  const appointments = [
    { id: 1, date: '2024-02-01', time: '09:00 AM', type: 'Follow-up', doctor: 'Dr. Williams', status: 'Confirmed' },
    { id: 2, date: '2024-02-15', time: '02:30 PM', type: 'Consultation', doctor: 'Dr. Garcia', status: 'Pending' },
    { id: 3, date: '2024-03-01', time: '10:00 AM', type: 'Annual Check-up', doctor: 'Dr. Chen', status: 'Confirmed' },
  ];

  const consents = [
    { id: 1, type: 'Medical Treatment', grantedTo: 'General Hospital', grantedDate: '2024-01-01', expiresDate: '2024-12-31', status: 'Active' },
    { id: 2, type: 'Data Sharing', grantedTo: 'Specialist Clinic', grantedDate: '2024-01-10', expiresDate: '2024-06-30', status: 'Active' },
    { id: 3, type: 'Research Participation', grantedTo: 'Medical Research Institute', grantedDate: '2023-12-01', expiresDate: '2024-11-30', status: 'Active' },
  ];

  const medications = [
    { id: 1, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedBy: 'Dr. Williams', startDate: '2024-01-01', status: 'Active' },
    { id: 2, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Chen', startDate: '2024-01-05', status: 'Active' },
    { id: 3, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', prescribedBy: 'Dr. Garcia', startDate: '2024-01-10', status: 'Active' },
  ];

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

  const RecordCard = ({ record }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
         onClick={() => setSelectedRecord(record)}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-3xl">
          {record.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{record.type}</h3>
          <p className="text-white/70 text-sm">{record.doctor} • {record.date}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          record.status === 'Completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          record.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        }`}>
          {record.status}
        </span>
      </div>
      <p className="text-white/60 text-sm">{record.description}</p>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{appointment.type}</h3>
          <p className="text-white/70 text-sm">{appointment.doctor} • {appointment.date}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          appointment.status === 'Confirmed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        }`}>
          {appointment.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">Time: {appointment.time}</span>
        <div className="space-x-2">
          <button className="px-3 py-1 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
            📅 Reschedule
          </button>
          <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
            📋 Details
          </button>
        </div>
      </div>
    </div>
  );

  const ConsentCard = ({ consent }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{consent.type}</h3>
          <p className="text-white/70 text-sm">Granted to: {consent.grantedTo}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          consent.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          'bg-red-500/20 text-red-300 border border-red-500/30'
        }`}>
          {consent.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Granted:</span>
          <span className="text-white">{consent.grantedDate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Expires:</span>
          <span className="text-white">{consent.expiresDate}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30">
          🚫 Revoke
        </button>
        <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30">
          📋 View Details
        </button>
      </div>
    </div>
  );

  const MedicationCard = ({ medication }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{medication.name}</h3>
          <p className="text-white/70 text-sm">{medication.dosage} • {medication.frequency}</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          medication.status === 'Active' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          'bg-red-500/20 text-red-300 border border-red-500/30'
        }`}>
          {medication.status}
        </span>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Prescribed by:</span>
          <span className="text-white">{medication.prescribedBy}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Start date:</span>
          <span className="text-white">{medication.startDate}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
          📋 Instructions
        </button>
        <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
          💊 Refill
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            👤 Patient Portal
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Welcome to your personal healthcare portal. Access your medical records, manage appointments, and stay informed about your health journey.
          </p>
        </div>

        {/* Patient Info Card */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white text-3xl font-bold">{patientInfo.name.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{patientInfo.name}</h2>
              <p className="text-white/70">Patient ID: {patientInfo.id}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/60">Age:</span>
                <span className="text-white font-semibold">{patientInfo.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Blood Type:</span>
                <span className="text-white font-semibold">{patientInfo.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Insurance:</span>
                <span className="text-white font-semibold">{patientInfo.insurance}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/60">Last Visit:</span>
                <span className="text-white font-semibold">{patientInfo.lastVisit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Next Appointment:</span>
                <span className="text-white font-semibold">{patientInfo.nextAppointment}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-white/60 text-sm">Allergies:</span>
                <div className="mt-2 space-y-1">
                  {patientInfo.allergies.map((allergy, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-red-500/20 text-red-300 rounded-xl text-xs border border-red-500/30 mr-2 mb-2">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto">
          <TabButton tab="overview" label="Overview" icon="📊" />
          <TabButton tab="records" label="Medical Records" icon="📋" />
          <TabButton tab="appointments" label="Appointments" icon="📅" />
          <TabButton tab="consents" label="Consents" icon="✍️" />
          <TabButton tab="medications" label="Medications" icon="💊" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
                <div className="text-3xl mb-2">📋</div>
                <p className="text-2xl font-bold text-white">{medicalRecords.length}</p>
                <p className="text-white/70 text-sm">Medical Records</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
                <div className="text-3xl mb-2">📅</div>
                <p className="text-2xl font-bold text-white">{appointments.length}</p>
                <p className="text-white/70 text-sm">Appointments</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
                <div className="text-3xl mb-2">✍️</div>
                <p className="text-2xl font-bold text-white">{consents.length}</p>
                <p className="text-white/70 text-sm">Active Consents</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl text-center">
                <div className="text-3xl mb-2">💊</div>
                <p className="text-2xl font-bold text-white">{medications.length}</p>
                <p className="text-white/70 text-sm">Medications</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                    ✅
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Blood test completed</p>
                    <p className="text-white/60 text-sm">Dr. Williams • 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    📅
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Appointment scheduled</p>
                    <p className="text-white/60 text-sm">Follow-up with Dr. Williams • Feb 1st</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                    💊
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">New medication prescribed</p>
                    <p className="text-white/60 text-sm">Atorvastatin by Dr. Garcia • 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <button className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  📅 Schedule Appointment
                </button>
                <button className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  📋 Request Records
                </button>
                <button className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg">
                  💬 Contact Doctor
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'records' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Medical Records</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                📋 Request New Record
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medicalRecords.map(record => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Appointments</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                📅 Schedule New
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'consents' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Consent Management</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg">
                ✍️ Grant New Consent
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consents.map(consent => (
                <ConsentCard key={consent.id} consent={consent} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Medications</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                💊 Request Refill
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {medications.map(medication => (
                <MedicationCard key={medication.id} medication={medication} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Record Details</h3>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-white/60 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white/80 mb-2">Record Type</h4>
                  <p className="text-white">{selectedRecord.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/80 mb-2">Date</h4>
                  <p className="text-white">{selectedRecord.date}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/80 mb-2">Doctor</h4>
                  <p className="text-white">{selectedRecord.doctor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white/80 mb-2">Status</h4>
                  <p className="text-white">{selectedRecord.status}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white/80 mb-2">Description</h4>
                <p className="text-white">{selectedRecord.description}</p>
              </div>
            </div>
            <div className="mt-8 flex space-x-4">
              <button className="px-6 py-3 bg-blue-500/20 text-blue-300 rounded-2xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30">
                📥 Download
              </button>
              <button className="px-6 py-3 bg-green-500/20 text-green-300 rounded-2xl hover:bg-green-500/30 transition-all duration-200 border border-green-500/30">
                📧 Share
              </button>
              <button className="px-6 py-3 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all duration-200 border border-white/30">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}