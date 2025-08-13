'use client';

import React, { useState, useEffect } from 'react';
import { 
    Shield, 
    AlertTriangle, 
    Eye, 
    Lock, 
    Activity, 
    TrendingUp, 
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SecurityDashboard = () => {
    const [securityEvents, setSecurityEvents] = useState([]);
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [systemHealth, setSystemHealth] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

    useEffect(() => {
        fetchSecurityData();
        const interval = setInterval(fetchSecurityData, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchSecurityData = async () => {
        try {
            const [eventsRes, vulnsRes, healthRes] = await Promise.all([
                fetch('/api/security/events'),
                fetch('/api/security/vulnerabilities'),
                fetch('/api/health')
            ]);

            if (eventsRes.ok) {
                const eventsData = await eventsRes.json();
                setSecurityEvents(eventsData.data || []);
            }

            if (vulnsRes.ok) {
                const vulnsData = await vulnsRes.json();
                setVulnerabilities(vulnsData.data || []);
            }

            if (healthRes.ok) {
                const healthData = await healthRes.json();
                setSystemHealth(healthData);
            }
        } catch (error) {
            console.error('Error fetching security data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 1: return 'text-green-600 bg-green-100';
            case 2: return 'text-blue-600 bg-blue-100';
            case 3: return 'text-yellow-600 bg-yellow-100';
            case 4: return 'text-orange-600 bg-orange-100';
            case 5: return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 1: return <CheckCircle className="w-4 h-4" />;
            case 2: return <CheckCircle className="w-4 h-4" />;
            case 3: return <AlertTriangle className="w-4 h-4" />;
            case 4: return <AlertCircle className="w-4 h-4" />;
            case 5: return <XCircle className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getEventTypeIcon = (eventType) => {
        switch (eventType) {
            case 'SUSPICIOUS_REQUEST': return <Eye className="w-4 h-4" />;
            case 'VALIDATION_ERROR': return <AlertTriangle className="w-4 h-4" />;
            case 'SECURITY_VIOLATION': return <Shield className="w-4 h-4" />;
            case 'HEDERA_ERROR': return <Lock className="w-4 h-4" />;
            default: return <Activity className="w-4 h-4" />;
        }
    };

    const chartData = securityEvents.slice(-20).map(event => ({
        time: new Date(event.timestamp).toLocaleTimeString(),
        severity: event.severity,
        type: event.eventType
    }));

    const severityDistribution = [
        { name: 'Low (1-2)', value: securityEvents.filter(e => e.severity <= 2).length, color: '#10B981' },
        { name: 'Medium (3)', value: securityEvents.filter(e => e.severity === 3).length, color: '#F59E0B' },
        { name: 'High (4-5)', value: securityEvents.filter(e => e.severity >= 4).length, color: '#EF4444' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
                    <p className="text-gray-600">Real-time security monitoring and threat detection</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
            </div>

            {/* System Health Status */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">System Status</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {systemHealth.status === 'healthy' ? 'Healthy' : 'Issues Detected'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Lock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Hedera Status</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {systemHealth.hederaStatus === 'connected' ? 'Connected' : 'Disconnected'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Open Vulnerabilities</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {vulnerabilities.filter(v => v.status === 'open').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">High Severity Events</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {securityEvents.filter(e => e.severity >= 4).length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Events Timeline</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="severity" stroke="#3B82F6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Severity Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={severityDistribution}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {severityDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Security Events */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Event Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Severity
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    IP Address
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {securityEvents.slice(-10).map((event, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getEventTypeIcon(event.eventType)}
                                            <span className="ml-2 text-sm text-gray-900">{event.eventType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                        {event.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                                            {getSeverityIcon(event.severity)}
                                            <span className="ml-1">Level {event.severity}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {event.ip}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Vulnerability Reports */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Vulnerability Reports</h3>
                </div>
                <div className="p-6">
                    {vulnerabilities.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No vulnerabilities reported</p>
                    ) : (
                        <div className="space-y-4">
                            {vulnerabilities.map((vuln, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <AlertTriangle className="w-5 h-5 text-red-600" />
                                            <div>
                                                <h4 className="font-medium text-gray-900">{vuln.vulnerabilityType}</h4>
                                                <p className="text-sm text-gray-600">{vuln.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                                                Level {vuln.severity}
                                            </span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                vuln.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                                {vuln.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">
                                        <span>Component: {vuln.affectedComponent}</span>
                                        <span className="mx-2">•</span>
                                        <span>Reported: {new Date(vuln.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityDashboard;
