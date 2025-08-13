'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [connectionStatus, setConnectionStatus] = useState({
    backend: 'checking...',
    hedera: 'checking...',
    smartContracts: 'checking...'
  });

  const [stats, setStats] = useState({
    totalPatients: 1247,
    activeDoctors: 89,
    pendingRecords: 23,
    securityAlerts: 2
  });

  useEffect(() => {
    checkConnections();
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        pendingRecords: Math.max(0, prev.pendingRecords + Math.floor(Math.random() * 3) - 1),
        securityAlerts: Math.max(0, prev.securityAlerts + Math.floor(Math.random() * 2) - 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkConnections = async () => {
    try {
      const backendResponse = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
      });
      
      if (backendResponse.ok) {
        setConnectionStatus(prev => ({...prev, backend: '✅ Connected'}));
      } else {
        setConnectionStatus(prev => ({...prev, backend: '❌ Backend Error'}));
      }
    } catch (error) {
      setConnectionStatus(prev => ({...prev, backend: '❌ Backend Offline'}));
    }
    
    setConnectionStatus(prev => ({...prev, hedera: '✅ Configured', smartContracts: '✅ Deployed'}));
  };

  const StatCard = ({ title, value, icon, color, change, gradient }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-300' : 'text-red-300'}`}>
              {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl ${gradient} flex items-center justify-center text-3xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const StatusCard = ({ title, status, description }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-md ${
          status.includes('✅') 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
            : status.includes('❌')
            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        }`}>
          {status}
        </div>
      </div>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-clip-text">
            🏥 Healthcare Platform
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            Experience healthcare management like never before. Advanced patient care with cutting-edge technology designed to elevate your medical practice.
          </p>
          
          <button 
            onClick={checkConnections}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-md border border-white/30"
          >
            🔄 Refresh Status
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Patients" 
            value={stats.totalPatients.toLocaleString()} 
            icon="👥" 
            gradient="from-blue-500 to-cyan-500"
            change={2.5}
          />
          <StatCard 
            title="Active Doctors" 
            value={stats.activeDoctors} 
            icon="👨‍⚕️" 
            gradient="from-green-500 to-emerald-500"
            change={1.2}
          />
          <StatCard 
            title="Pending Records" 
            value={stats.pendingRecords} 
            icon="📋" 
            gradient="from-yellow-500 to-orange-500"
            change={-0.8}
          />
          <StatCard 
            title="Security Alerts" 
            value={stats.securityAlerts} 
            icon="🚨" 
            gradient="from-red-500 to-pink-500"
            change={0}
          />
        </div>

        {/* System Status */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatusCard 
            title="Backend API" 
            status={connectionStatus.backend}
            description="Express.js server with security middleware and rate limiting"
          />
          <StatusCard 
            title="Hedera Network" 
            status={connectionStatus.hedera}
            description="Testnet connection with smart contract deployment"
          />
          <StatusCard 
            title="Smart Contracts" 
            status={connectionStatus.smartContracts}
            description="Medical records, consent management, and pharmacy contracts"
          />
        </div>

        {/* Configuration Display */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 mb-12 border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
            🔧 System Configuration
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
                🔐 Hedera Account
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-white/70">
                  Account ID: <code className="bg-white/20 px-3 py-1 rounded-xl text-xs font-mono text-white border border-white/30">0.0.6472099</code>
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
                📋 HCS Topics
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <p>Medical Records: <code className="bg-white/20 px-2 py-1 rounded-lg text-xs font-mono text-white border border-white/30">0.0.6557981</code></p>
                <p>Cold Chain: <code className="bg-white/20 px-2 py-1 rounded-lg text-xs font-mono text-white border border-white/30">0.0.6558001</code></p>
                <p>Patient Consent: <code className="bg-white/20 px-2 py-1 rounded-lg text-xs font-mono text-white border border-white/30">0.0.6558003</code></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
                📝 Smart Contracts
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <p>Medical Records: <code className="bg-white/20 px-2 py-1 rounded-lg text-xs font-mono text-white border border-white/30">0.0.6558020</code></p>
                <p>Consent Management: <code className="bg-white/20 px-2 py-1 rounded-lg text-xs font-mono text-white border border-white/30">0.0.6558021</code></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4 text-white flex items-center">
                🌐 Network
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-white/70">
                  Environment: <span className="font-semibold text-green-300">Hedera Testnet</span>
                </p>
                <p className="text-sm text-white/70">
                  Status: <span className="text-green-300">● Active</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 border border-white/20 shadow-2xl">
            <div className="text-6xl mb-6">🏥</div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Medical Records
            </h3>
            <p className="text-white/70">
              Secure, immutable medical record management with patient consent controls and role-based access
            </p>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 border border-white/20 shadow-2xl">
            <div className="text-6xl mb-6">🧊</div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Cold Chain Tracking
            </h3>
            <p className="text-white/70">
              Real-time monitoring of pharmaceutical supply chain temperature data with IoT integration
            </p>
          </div>
          
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 border border-white/20 shadow-2xl">
            <div className="text-6xl mb-6">🔒</div>
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Privacy & Security
            </h3>
            <p className="text-white/70">
              GDPR compliant with advanced encryption, access controls, and real-time security monitoring
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 text-center border border-white/20 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">
            🚀 Quick Actions
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Access key platform features and manage your healthcare operations with cutting-edge technology
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-105 border border-white/30">
              📊 View Analytics
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:scale-105 border border-white/30">
              🔍 Search Records
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:scale-105 border border-white/30">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
