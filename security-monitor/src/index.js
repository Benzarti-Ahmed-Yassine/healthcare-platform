const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const cron = require('node-cron');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3003;

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' }),
    new winston.transports.Console()
  ]
});

// Security middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Security monitoring data
let securityMetrics = {
  threatsDetected: 0,
  failedLogins: 0,
  suspiciousActivities: 0,
  lastScan: new Date(),
  alerts: []
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'security-monitor',
    timestamp: new Date().toISOString(),
    metrics: securityMetrics
  });
});

// Security metrics endpoint
app.get('/metrics', (req, res) => {
  res.json(securityMetrics);
});

// Threat detection endpoint
app.post('/detect', (req, res) => {
  const { type, severity, details } = req.body;
  
  securityMetrics.threatsDetected++;
  securityMetrics.alerts.push({
    id: Date.now(),
    type,
    severity,
    details,
    timestamp: new Date().toISOString()
  });

  logger.warn(`Threat detected: ${type} - ${severity}`, { details });
  
  // Send alert if high severity
  if (severity === 'high' || severity === 'critical') {
    sendSecurityAlert(type, severity, details);
  }

  res.json({ success: true, alertId: securityMetrics.alerts[securityMetrics.alerts.length - 1].id });
});

// Security scan endpoint
app.post('/scan', async (req, res) => {
  try {
    logger.info('Starting security scan...');
    
    // Simulate security scan
    const scanResults = await performSecurityScan();
    
    securityMetrics.lastScan = new Date();
    
    logger.info('Security scan completed', scanResults);
    res.json({ success: true, results: scanResults });
  } catch (error) {
    logger.error('Security scan failed', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Perform security scan
async function performSecurityScan() {
  const results = {
    vulnerabilities: [],
    recommendations: [],
    scanTime: new Date().toISOString()
  };

  // Check for common vulnerabilities
  try {
    // Check if services are accessible
    const services = [
      { name: 'backend', url: 'http://backend:3001/health' },
      { name: 'frontend', url: 'http://frontend:3000' },
      { name: 'mongodb', url: 'mongodb://mongo:27017' },
      { name: 'redis', url: 'redis://redis:6379' }
    ];

    for (const service of services) {
      try {
        if (service.name === 'mongodb' || service.name === 'redis') {
          // Skip database connectivity checks for now
          continue;
        }
        
        const response = await axios.get(service.url, { timeout: 5000 });
        if (response.status === 200) {
          logger.info(`Service ${service.name} is healthy`);
        }
      } catch (error) {
        logger.warn(`Service ${service.name} health check failed: ${error.message}`);
        results.vulnerabilities.push({
          type: 'service_unavailable',
          service: service.name,
          severity: 'medium',
          description: `Service ${service.name} is not responding`
        });
      }
    }

    // Add some sample recommendations
    results.recommendations.push({
      type: 'security_headers',
      description: 'Ensure all services have proper security headers',
      priority: 'high'
    });

    results.recommendations.push({
      type: 'rate_limiting',
      description: 'Implement rate limiting on authentication endpoints',
      priority: 'medium'
    });

  } catch (error) {
    logger.error('Error during security scan', error);
  }

  return results;
}

// Send security alert
async function sendSecurityAlert(type, severity, details) {
  try {
    // For now, just log the alert
    // In production, you would send emails, Slack notifications, etc.
    logger.error(`SECURITY ALERT: ${type} - ${severity}`, {
      type,
      severity,
      details,
      timestamp: new Date().toISOString()
    });

    // You can implement email sending here
    // const transporter = nodemailer.createTransporter({...});
    // await transporter.sendMail({...});

  } catch (error) {
    logger.error('Failed to send security alert', error);
  }
}

// Scheduled security tasks
cron.schedule('0 */6 * * *', async () => {
  logger.info('Running scheduled security scan...');
  try {
    await performSecurityScan();
  } catch (error) {
    logger.error('Scheduled security scan failed', error);
  }
});

// Clean up old alerts (keep last 100)
cron.schedule('0 2 * * *', () => {
  if (securityMetrics.alerts.length > 100) {
    securityMetrics.alerts = securityMetrics.alerts.slice(-100);
    logger.info('Cleaned up old security alerts');
  }
});

// Start server
app.listen(PORT, () => {
  logger.info(`Security Monitor service started on port ${PORT}`);
  logger.info('Security monitoring active - scanning every 6 hours');
});

module.exports = app;
