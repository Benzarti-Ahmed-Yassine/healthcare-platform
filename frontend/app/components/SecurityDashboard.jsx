'use client';

import { useState, useEffect } from 'react';

export default function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const securityStats = {
    totalAlerts: 23,
    criticalAlerts: 3,
    resolvedAlerts: 18,
    pendingAlerts: 2,
    systemHealth: 94,
    lastScan: '2 hours ago'
  };

  const alerts = [
    { 
      id: 1, 
      type: 'Unauthorized Access Attempt', 
      severity: 'Critical', 
      source: '192.168.1.100', 
      target: 'Medical Records API', 
      time: '5 minutes ago', 
      status: 'Active',
      description: 'Multiple failed login attempts detected from suspicious IP address'
    },
    { 
      id: 2, 
      type: 'Data Export Anomaly', 
      severity: 'High', 
      source: 'User: dr.smith', 
      target: 'Patient Database', 
      time: '15 minutes ago', 
      status: 'Investigating',
      description: 'Unusual volume of patient records exported outside business hours'
    },
    { 
      id: 3, 
      type: 'System Vulnerability', 
      severity: 'Medium', 
      source: 'Security Scanner', 
      target: 'Backend Server', 
      time: '1 hour ago', 
      status: 'Patched',
      description: 'SQL injection vulnerability found and patched in user authentication'
    },
    { 
      id: 4, 
      type: 'Network Intrusion', 
      severity: 'Critical', 
      source: 'Unknown', 
      target: 'Firewall', 
      time: '2 hours ago', 
      status: 'Blocked',
      description: 'Suspicious network traffic patterns detected and blocked'
    },
  ];

  const vulnerabilities = [
    { id: 1, name: 'SQL Injection', severity: 'High', status: 'Patched', discovered: '2024-01-15', patched: '2024-01-15' },
    { id: 2, name: 'XSS Vulnerability', severity: 'Medium', status: 'Open', discovered: '2024-01-14', patched: null },
    { id: 3, name: 'Weak Password Policy', severity: 'Low', status: 'Open', discovered: '2024-01-13', patched: null },
    { id: 4, name: 'Missing SSL Certificate', severity: 'Critical', status: 'Patched', discovered: '2024-01-12', patched: '2024-01-12' },
  ];

  const auditLogs = [
    { id: 1, user: 'dr.williams', action: 'View Patient Record', patient: 'John Smith', time: '2 minutes ago', ip: '192.168.1.50', status: 'Allowed' },
    { id: 2, user: 'nurse.johnson', action: 'Update Medical Record', patient: 'Sarah Davis', time: '5 minutes ago', ip: '192.168.1.51', status: 'Allowed' },
    { id: 3, user: 'admin.user', action: 'System Configuration', patient: 'N/A', time: '10 minutes ago', ip: '192.168.1.10', status: 'Allowed' },
    { id: 4, user: 'unknown', action: 'Login Attempt', patient: 'N/A', time: '15 minutes ago', ip: '192.168.1.100', status: 'Blocked' },
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

  const AlertCard = ({ alert }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
         onClick={() => setSelectedAlert(alert)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            alert.severity === 'Critical' ? 'bg-red-500' :
            alert.severity === 'High' ? 'bg-orange-500' :
            alert.severity === 'Medium' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}></div>
          <h3 className="text-lg font-semibold text-white">{alert.type}</h3>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
            alert.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
            alert.severity === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
            alert.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {alert.severity}
          </span>
          <div className="mt-1">
            <span className={`px-2 py-1 rounded-full text-xs backdrop-blur-md ${
              alert.status === 'Active' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              alert.status === 'Investigating' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
              'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {alert.status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Source:</span>
          <span className="text-white font-mono">{alert.source}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Target:</span>
          <span className="text-white">{alert.target}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Time:</span>
          <span className="text-white">{alert.time}</span>
        </div>
      </div>
      
      <p className="text-white/70 text-sm">{alert.description}</p>
    </div>
  );

  const VulnerabilityCard = ({ vulnerability }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{vulnerability.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
          vulnerability.severity === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
          vulnerability.severity === 'High' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
          vulnerability.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
          'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        }`}>
          {vulnerability.severity}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Status:</span>
          <span className={`${
            vulnerability.status === 'Patched' ? 'text-green-300' :
            'text-yellow-300'
          }`}>
            {vulnerability.status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Discovered:</span>
          <span className="text-white">{vulnerability.discovered}</span>
        </div>
        {vulnerability.patched && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Patched:</span>
            <span className="text-white">{vulnerability.patched}</span>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2">
        {vulnerability.status === 'Open' && (
          <button className="px-3 py-1 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30">
            Mark as Patched
          </button>
        )}
        <button className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30">
          View Details
        </button>
      </div>
    </div>
  );

  const AuditLogCard = ({ log }) => (
    <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{log.action}</h3>
          <p className="text-sm text-white/60">User: {log.user}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
          log.status === 'Allowed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          'bg-red-500/20 text-red-300 border border-red-500/30'
        }`}>
          {log.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        {log.patient !== 'N/A' && (
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Patient:</span>
            <span className="text-white">{log.patient}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-white/60">IP Address:</span>
          <span className="text-white font-mono">{log.ip}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Time:</span>
          <span className="text-white">{log.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            🔒 Security Dashboard
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Real-time security monitoring, threat detection, and compliance management with cutting-edge technology
          </p>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-sm font-medium text-white/70">Total Alerts</h3>
            <p className="text-2xl font-bold text-red-300">{securityStats.totalAlerts}</p>
            <p className="text-xs text-red-300">↗ 3 new today</p>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-sm font-medium text-white/70">Critical Alerts</h3>
            <p className="text-2xl font-bold text-red-300">{securityStats.criticalAlerts}</p>
            <p className="text-xs text-red-300">Requires immediate attention</p>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-sm font-medium text-white/70">System Health</h3>
            <p className="text-2xl font-bold text-green-300">{securityStats.systemHealth}%</p>
            <p className="text-xs text-green-300">↗ 2% improvement</p>
          </div>
          <div className="backdrop-blur-md bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
            <h3 className="text-sm font-medium text-white/70">Last Scan</h3>
            <p className="text-2xl font-bold text-blue-300">{securityStats.lastScan}</p>
            <p className="text-xs text-blue-300">Automated security scan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto">
          <TabButton tab="overview" label="Overview" icon="📊" />
          <TabButton tab="alerts" label="Security Alerts" icon="🚨" />
          <TabButton tab="vulnerabilities" label="Vulnerabilities" icon="⚠️" />
          <TabButton tab="audit" label="Audit Logs" icon="📋" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Health Overview */}
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">System Security Health</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3"/>
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${securityStats.systemHealth}, 100`}/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{securityStats.systemHealth}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/70">Overall Security Score</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Network Security</span>
                      <span className="text-green-300">98%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Data Protection</span>
                      <span className="text-green-300">95%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Access Control</span>
                      <span className="text-yellow-300">87%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="font-semibold text-white text-xl">Recent Activity</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white/70">Security scan completed</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-white/70">2 vulnerabilities detected</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-white/70">1 critical alert raised</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <button className="w-full px-6 py-4 bg-blue-500/20 text-blue-300 rounded-2xl hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30">
                    🔍 Run Security Scan
                  </button>
                  <button className="w-full px-6 py-4 bg-green-500/20 text-green-300 rounded-2xl hover:bg-green-500/30 transition-all duration-200 border border-green-500/30">
                    📊 Generate Report
                  </button>
                  <button className="w-full px-6 py-4 bg-purple-500/20 text-purple-300 rounded-2xl hover:bg-purple-500/30 transition-all duration-200 border border-purple-500/30">
                    ⚙️ Security Settings
                  </button>
                </div>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">Compliance Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">HIPAA Compliance</span>
                    <span className="text-green-300">✅ Compliant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">GDPR Compliance</span>
                    <span className="text-green-300">✅ Compliant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">SOC 2 Type II</span>
                    <span className="text-yellow-300">🔄 In Progress</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">ISO 27001</span>
                    <span className="text-blue-300">📋 Planning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Security Alerts</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                Mark All Resolved
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vulnerabilities' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Vulnerability Assessment</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg">
                Run New Scan
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vulnerabilities.map(vulnerability => (
                <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Audit Logs</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg">
                Export Logs
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auditLogs.map(log => (
                <AuditLogCard key={log.id} log={log} />
              ))}
            </div>
          </div>
        )}

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="backdrop-blur-md bg-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Alert Details</h3>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Alert Type</h4>
                    <p className="text-white">{selectedAlert.type}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Severity</h4>
                    <p className="text-white">{selectedAlert.severity}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Source</h4>
                    <p className="text-white font-mono">{selectedAlert.source}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Target</h4>
                    <p className="text-white">{selectedAlert.target}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Time</h4>
                    <p className="text-white">{selectedAlert.time}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white/80 mb-2">Status</h4>
                    <p className="text-white">{selectedAlert.status}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white/80 mb-2">Description</h4>
                  <p className="text-white">{selectedAlert.description}</p>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <button className="px-6 py-3 bg-red-500/20 text-red-300 rounded-2xl hover:bg-red-500/30 transition-all duration-200 border border-red-500/30">
                  🚨 Escalate
                </button>
                <button className="px-6 py-3 bg-green-500/20 text-green-300 rounded-2xl hover:bg-green-500/30 transition-all duration-200 border border-green-500/30">
                  ✅ Resolve
                </button>
                <button className="px-6 py-3 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all duration-200 border border-white/30">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
