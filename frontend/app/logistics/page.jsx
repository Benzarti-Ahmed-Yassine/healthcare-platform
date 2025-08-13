'use client';

import { useState, useEffect } from 'react';

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedShipment, setSelectedShipment] = useState(null);

  const shipments = [
    { 
      id: 1, 
      trackingNumber: 'SH-001-2024', 
      origin: 'PharmaCorp HQ', 
      destination: 'City General Hospital', 
      status: 'In Transit', 
      temperature: '2.3°C', 
      humidity: '45%', 
      eta: '2024-01-18 14:00',
      lastUpdate: '2 hours ago',
      alerts: 0
    },
    { 
      id: 2, 
      trackingNumber: 'SH-002-2024', 
      origin: 'MedSupply Inc', 
      destination: 'Regional Medical Center', 
      status: 'Delivered', 
      temperature: '2.1°C', 
      humidity: '42%', 
      eta: '2024-01-17 09:00',
      lastUpdate: '1 day ago',
      alerts: 0
    },
    { 
      id: 3, 
      trackingNumber: 'SH-003-2024', 
      origin: 'BioTech Labs', 
      destination: 'University Hospital', 
      status: 'In Transit', 
      temperature: '8.5°C', 
      humidity: '38%', 
      eta: '2024-01-19 16:00',
      lastUpdate: '30 minutes ago',
      alerts: 2
    },
    { 
      id: 4, 
      trackingNumber: 'SH-004-2024', 
      origin: 'VaccineHub', 
      destination: 'Community Clinic', 
      status: 'Scheduled', 
      temperature: 'N/A', 
      humidity: 'N/A', 
      eta: '2024-01-20 10:00',
      lastUpdate: 'Scheduled',
      alerts: 0
    },
  ];

  const temperatureData = [
    { time: '00:00', temp: 2.1, humidity: 45 },
    { time: '02:00', temp: 2.3, humidity: 44 },
    { time: '04:00', temp: 2.0, humidity: 46 },
    { time: '06:00', temp: 2.2, humidity: 43 },
    { time: '08:00', temp: 2.4, humidity: 42 },
    { time: '10:00', temp: 2.1, humidity: 45 },
    { time: '12:00', temp: 2.3, humidity: 44 },
    { time: '14:00', temp: 2.2, humidity: 45 },
    { time: '16:00', temp: 2.0, humidity: 46 },
    { time: '18:00', temp: 2.1, humidity: 45 },
    { time: '20:00', temp: 2.3, humidity: 44 },
    { time: '22:00', temp: 2.2, humidity: 45 },
  ];

  const alerts = [
    { id: 1, type: 'Temperature Alert', severity: 'High', message: 'Temperature exceeded threshold: 8.5°C', time: '30 minutes ago', shipment: 'SH-003-2024' },
    { id: 2, type: 'Humidity Alert', severity: 'Medium', message: 'Humidity below recommended range: 38%', time: '1 hour ago', shipment: 'SH-003-2024' },
    { id: 3, type: 'Delay Alert', severity: 'Low', message: 'Shipment delayed by 2 hours', time: '3 hours ago', shipment: 'SH-001-2024' },
  ];

  const TabButton = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
        activeTab === tab
          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );

  const ShipmentCard = ({ shipment }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
         onClick={() => setSelectedShipment(shipment)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{shipment.trackingNumber}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.origin} → {shipment.destination}</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            shipment.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {shipment.status}
          </span>
          {shipment.alerts > 0 && (
            <div className="mt-1">
              <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs">
                {shipment.alerts} Alert{shipment.alerts > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Temperature</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{shipment.temperature}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Humidity</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{shipment.humidity}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>ETA: {shipment.eta}</span>
        <span>Updated: {shipment.lastUpdate}</span>
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            alert.severity === 'High' ? 'bg-red-500' :
            alert.severity === 'Medium' ? 'bg-yellow-500' :
            'bg-blue-500'
          }`}></div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{alert.type}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          alert.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {alert.severity}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-3">{alert.message}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Shipment: {alert.shipment}</span>
        <span>{alert.time}</span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200">
          Acknowledge
        </button>
        <button className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200">
          Resolve
        </button>
      </div>
    </div>
  );

  const TemperatureChart = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Temperature & Humidity Monitoring</h3>
      <div className="h-64 flex items-end justify-between space-x-1">
        {temperatureData.map((data, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="w-8 bg-blue-500 rounded-t" style={{ height: `${(data.temp + 10) * 8}px` }}></div>
            <div className="w-8 bg-green-500 rounded-t" style={{ height: `${data.humidity * 2}px` }}></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{data.time}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Temperature (°C)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Humidity (%)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">🚚 Logistics & Cold Chain</h1>
        <p className="text-gray-600 dark:text-gray-400">Real-time monitoring of pharmaceutical supply chain and temperature-controlled logistics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Shipments</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">12</p>
          <p className="text-xs text-green-600 dark:text-green-400">↗ 2 new today</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Temperature Alerts</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">3</p>
          <p className="text-xs text-red-600 dark:text-red-400">↗ 1 new alert</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">On-Time Delivery</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">94%</p>
          <p className="text-xs text-green-600 dark:text-green-400">↗ 2% improvement</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$2.4M</p>
          <p className="text-xs text-green-600 dark:text-green-400">↗ $180K this week</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        <TabButton tab="overview" label="Overview" icon="📊" />
        <TabButton tab="shipments" label="Shipments" icon="📦" />
        <TabButton tab="alerts" label="Alerts" icon="🚨" />
        <TabButton tab="analytics" label="Analytics" icon="📈" />
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <TemperatureChart />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Shipments</h3>
              <div className="space-y-3">
                {shipments.slice(0, 3).map(shipment => (
                  <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{shipment.trackingNumber}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{shipment.status}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{shipment.temperature}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{shipment.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Alerts</h3>
              <div className="space-y-3">
                {alerts.slice(0, 3).map(alert => (
                  <div key={alert.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'High' ? 'bg-red-500' :
                      alert.severity === 'Medium' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.type}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shipments' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipment Tracking</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
              + New Shipment
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shipments.map(shipment => (
              <ShipmentCard key={shipment.id} shipment={shipment} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Alerts</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
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

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">On Time</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Delayed</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '4%' }}></div>
                    </div>
                    <span className="text-sm font-medium">4%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Failed</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Temperature Compliance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Within Range</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <span className="text-sm font-medium">97%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Minor Deviation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Critical Deviation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '1%' }}></div>
                    </div>
                    <span className="text-sm font-medium">1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supply Chain Insights</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">15</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Suppliers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">89%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Supplier Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">$180K</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shipment Detail Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shipment Details</h3>
              <button 
                onClick={() => setSelectedShipment(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Tracking Number</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.trackingNumber}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Status</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.status}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Origin</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.origin}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Destination</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.destination}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Temperature</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.temperature}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Humidity</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.humidity}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">ETA</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.eta}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200">Last Update</h4>
                  <p className="text-gray-900 dark:text-white">{selectedShipment.lastUpdate}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                📍 Track Location
              </button>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
                📊 View Analytics
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}