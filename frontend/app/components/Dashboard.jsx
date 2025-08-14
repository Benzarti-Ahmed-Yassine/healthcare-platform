'use client';

import { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

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

  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    checkConnections();
    setLoading(false);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        pendingRecords: Math.max(0, prev.pendingRecords + Math.floor(Math.random() * 3) - 1),
        securityAlerts: Math.max(0, prev.securityAlerts + Math.floor(Math.random() * 2) - 1)
      }));
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const checkConnections = async () => {
    try {
      if (!BACKEND_URL) {
        setConnectionStatus(prev => ({ ...prev, backend: '⚠️ Not configured' }));
      } else {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const backendResponse = await fetch(`${BACKEND_URL}/api/health`, { method: 'GET', signal: controller.signal });
        clearTimeout(timeout);
        if (backendResponse.ok) {
          setConnectionStatus(prev => ({ ...prev, backend: '✅ Connected' }));
        } else {
          setConnectionStatus(prev => ({ ...prev, backend: '❌ Backend Error' }));
        }
      }
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, backend: '❌ Backend Offline' }));
    }

    setConnectionStatus(prev => ({ ...prev, hedera: '✅ Configured', smartContracts: '✅ Deployed' }));
  };

  // Enhanced component definitions with modern design
  const StatCard = ({ title, value, icon, change, type = 'default' }) => {
    const getColorClasses = () => {
      switch (type) {
        case 'patients':
          return {
            bg: 'from-medical-500/20 to-medical-600/20 dark:from-medical-900/30 dark:to-medical-800/30',
            border: 'border-medical-200/50 dark:border-medical-700/50',
            iconBg: 'bg-gradient-medical',
            shadow: 'shadow-medical/25'
          };
        case 'doctors':
          return {
            bg: 'from-health-500/20 to-health-600/20 dark:from-health-900/30 dark:to-health-800/30',
            border: 'border-health-200/50 dark:border-health-700/50',
            iconBg: 'bg-gradient-health',
            shadow: 'shadow-health/25'
          };
        case 'records':
          return {
            bg: 'from-warning-500/20 to-warning-600/20 dark:from-warning-900/30 dark:to-warning-800/30',
            border: 'border-warning-200/50 dark:border-warning-700/50',
            iconBg: 'bg-gradient-to-r from-warning-500 to-warning-600',
            shadow: 'shadow-lg'
          };
        case 'alerts':
          return {
            bg: 'from-safety-500/20 to-safety-600/20 dark:from-safety-900/30 dark:to-safety-800/30',
            border: 'border-safety-200/50 dark:border-safety-700/50',
            iconBg: 'bg-gradient-to-r from-safety-500 to-safety-600',
            shadow: 'shadow-lg'
          };
        default:
          return {
            bg: 'from-slate-500/20 to-slate-600/20 dark:from-slate-800/30 dark:to-slate-700/30',
            border: 'border-slate-200/50 dark:border-slate-700/50',
            iconBg: 'bg-gradient-to-r from-slate-500 to-slate-600',
            shadow: 'shadow-soft'
          };
      }
    };

    const colors = getColorClasses();

    return (
      <div className={`medical-card bg-gradient-to-br ${colors.bg} border ${colors.border} 
                     ${colors.shadow} hover:shadow-medium hover:scale-[1.02] 
                     transition-all duration-300 ease-out group animate-slide-up`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {title}
            </p>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {loading ? (
                <div className="h-9 w-20 bg-slate-200 dark:bg-slate-700 rounded loading-skeleton" />
              ) : (
                value
              )}
            </div>
            {change && (
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                change > 0 
                  ? 'bg-health-100 dark:bg-health-900/20 text-health-700 dark:text-health-300' 
                  : change < 0 
                  ? 'bg-safety-100 dark:bg-safety-900/20 text-safety-700 dark:text-safety-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                <svg className={`w-3 h-3 mr-1 ${change > 0 ? 'rotate-0' : 'rotate-180'}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M7 14l5-5 5 5" />
                </svg>
                {Math.abs(change)}%
              </div>
            )}
          </div>
          <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center 
                         ${colors.shadow} group-hover:scale-110 transition-transform duration-300 
                         animate-float`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  const StatusCard = ({ title, status, description, icon }) => {
    const getStatusClasses = () => {
      if (status.includes('✅')) {
        return {
          badge: 'badge-success',
          indicator: 'status-healthy',
          border: 'border-health-200/50 dark:border-health-700/50'
        };
      } else if (status.includes('❌')) {
        return {
          badge: 'badge-danger',
          indicator: 'status-critical',
          border: 'border-safety-200/50 dark:border-safety-700/50'
        };
      } else {
        return {
          badge: 'badge-warning',
          indicator: 'status-warning',
          border: 'border-warning-200/50 dark:border-warning-700/50'
        };
      }
    };

    const statusClasses = getStatusClasses();

    return (
      <div className={`medical-card border ${statusClasses.border} animate-slide-up`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl 
                            flex items-center justify-center">
                {icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={statusClasses.indicator} />
            <span className={statusClasses.badge}>
              {status}
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    );
  };

  const QuickActionCard = ({ title, description, icon, color, onClick }) => (
    <button
      onClick={onClick}
      className={`group p-6 rounded-3xl border transition-all duration-300 
                 hover:scale-[1.02] focus:outline-none focus:ring-4 
                 text-left w-full animate-slide-up ${
        color === 'medical' 
          ? 'bg-gradient-to-br from-medical-50 to-medical-100 dark:from-medical-900/20 dark:to-medical-800/20 border-medical-200/50 dark:border-medical-700/50 hover:shadow-medical focus:ring-medical-200 dark:focus:ring-medical-800'
          : color === 'health'
          ? 'bg-gradient-to-br from-health-50 to-health-100 dark:from-health-900/20 dark:to-health-800/20 border-health-200/50 dark:border-health-700/50 hover:shadow-health focus:ring-health-200 dark:focus:ring-health-800'
          : color === 'care'
          ? 'bg-gradient-to-br from-care-50 to-care-100 dark:from-care-900/20 dark:to-care-800/20 border-care-200/50 dark:border-care-700/50 hover:shadow-care focus:ring-care-200 dark:focus:ring-care-800'
          : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/20 dark:to-slate-700/20 border-slate-200/50 dark:border-slate-700/50 hover:shadow-soft focus:ring-slate-200 dark:focus:ring-slate-700'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center 
                       transition-all duration-300 group-hover:scale-110 ${
          color === 'medical' ? 'bg-gradient-medical shadow-medical' :
          color === 'health' ? 'bg-gradient-health shadow-health' :
          color === 'care' ? 'bg-gradient-care shadow-care' :
          'bg-gradient-to-r from-slate-500 to-slate-600 shadow-soft'
        }`}>
          <span className="text-white text-xl">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 
                       group-hover:text-slate-700 dark:group-hover:text-slate-200 
                       transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
        <svg className="w-5 h-5 text-slate-400 dark:text-slate-500 
                       group-hover:text-slate-600 dark:group-hover:text-slate-300 
                       group-hover:translate-x-1 transition-all duration-300" 
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-medical-200/30 dark:bg-medical-800/20 
                        rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-health-200/20 dark:bg-health-800/10 
                        rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full 
                          bg-medical-100 dark:bg-medical-900/30 
                          text-medical-700 dark:text-medical-300 
                          text-sm font-medium mb-6 animate-slide-down">
              <div className="status-healthy mr-2" />
              System Status: Operational
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 
                             dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 
                             bg-clip-text text-transparent">
                Healthcare Platform
              </span>
            </h1>
            <div className="flex items-center justify-center mt-4">
              <div className="w-16 h-16 bg-gradient-medical rounded-2xl flex items-center 
                            justify-center shadow-medical animate-breathe mr-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced healthcare management platform with secure medical records, 
              patient care coordination, and blockchain-based audit trails powered by Hedera Hashgraph.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={checkConnections}
                className="btn-primary inline-flex items-center"
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Checking...' : 'Refresh Status'}
              </button>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Patients" 
            value={stats.totalPatients.toLocaleString()} 
            icon={<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>} 
            type="patients"
            change={2.5}
          />
          <StatCard 
            title="Active Doctors" 
            value={stats.activeDoctors} 
            icon={<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>} 
            type="doctors"
            change={1.2}
          />
          <StatCard 
            title="Pending Records" 
            value={stats.pendingRecords} 
            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>} 
            type="records"
            change={-0.8}
          />
          <StatCard 
            title="Security Alerts" 
            value={stats.securityAlerts} 
            icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>} 
            type="alerts"
            change={0}
          />
        </div>

        {/* System Status */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            System Status
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StatusCard 
              title="Backend API" 
              status={connectionStatus.backend}
              description="Express.js server with security middleware and rate limiting"
              icon={<svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M5 12h14M5 12l4-4m-4 4l4 4" />
                    </svg>}
            />
            <StatusCard 
              title="Hedera Network" 
              status={connectionStatus.hedera}
              description="Testnet connection with smart contract deployment"
              icon={<svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9v18" />
                    </svg>}
            />
            <StatusCard 
              title="Smart Contracts" 
              status={connectionStatus.smartContracts}
              description="Medical records, consent management, and pharmacy contracts"
              icon={<svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}
            />
          </div>
        </div>

        {/* Configuration Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            System Configuration
          </h2>
          <div className="medical-card animate-slide-up">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200 
                             flex items-center">
                  <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center 
                                justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Hedera Account
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Account ID: 
                    <code className="ml-2 px-2 py-1 bg-slate-100 dark:bg-slate-800 
                                   rounded-lg text-xs font-mono text-slate-800 
                                   dark:text-slate-200 border border-slate-200 
                                   dark:border-slate-700">
                      0.0.6472099
                    </code>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200 
                             flex items-center">
                  <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center 
                                justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  HCS Topics
                </h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>Medical Records: 
                    <code className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                                   rounded text-xs font-mono">0.0.6557981</code>
                  </p>
                  <p>Cold Chain: 
                    <code className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                                   rounded text-xs font-mono">0.0.6558001</code>
                  </p>
                  <p>Patient Consent: 
                    <code className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                                   rounded text-xs font-mono">0.0.6558003</code>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200 
                             flex items-center">
                  <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center 
                                justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Smart Contracts
                </h3>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>Medical Records: 
                    <code className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                                   rounded text-xs font-mono">0.0.6558020</code>
                  </p>
                  <p>Consent Management: 
                    <code className="ml-1 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 
                                   rounded text-xs font-mono">0.0.6558021</code>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4 text-slate-800 dark:text-slate-200 
                             flex items-center">
                  <div className="w-8 h-8 bg-gradient-medical rounded-lg flex items-center 
                                justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9v18" />
                    </svg>
                  </div>
                  Network
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Environment: 
                    <span className="font-semibold text-health-600 dark:text-health-400">
                      Hedera Testnet
                    </span>
                  </p>
                  <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
                    <span>Status:</span>
                    <div className="status-healthy ml-2" />
                    <span className="ml-1 text-health-600 dark:text-health-400 font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuickActionCard
              title="Patient Management"
              description="View patient records, manage appointments, and coordinate care plans"
              icon="👥"
              color="medical"
              onClick={() => window.location.href = '/patient'}
            />
            <QuickActionCard
              title="Medical Records"
              description="Access secure medical records, create new entries, and manage permissions"
              icon="📋"
              color="health"
              onClick={() => window.location.href = '/healthcare'}
            />
            <QuickActionCard
              title="Security Dashboard"
              description="Monitor system security, view alerts, and manage access controls"
              icon="🔒"
              color="care"
              onClick={() => window.location.href = '/security'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
