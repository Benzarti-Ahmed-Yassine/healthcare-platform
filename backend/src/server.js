const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const compression = require('compression');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
const cron = require('node-cron');
const { Client, PrivateKey, AccountId } = require('@hashgraph/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: () => 500, // begin adding 500ms of delay per request above 50
    validate: { delayMs: false }
});

app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// Additional Security Middleware
app.use(hpp()); // Protect against HTTP Parameter Pollution attacks
app.use(mongoSanitize()); // Prevent NoSQL injection
// XSS protection middleware
app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }
    next();
});
app.use(compression()); // Compress responses

// CORS Configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging Configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'healthcare-platform' },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Express Winston Logger
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
}));

// Request Logging
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// Hedera Client Configuration
let hederaClient;
try {
    const hederaAccountId = process.env.HEDERA_ACCOUNT_ID;
    const hederaPrivateKey = process.env.HEDERA_PRIVATE_KEY;
    
    // Check if we have valid Hedera credentials (not placeholder values)
    if (hederaAccountId && hederaPrivateKey && 
        !hederaAccountId.includes('your_hedera') && 
        !hederaPrivateKey.includes('your_hedera')) {
        
        const accountId = AccountId.fromString(hederaAccountId);
        const privateKey = PrivateKey.fromString(hederaPrivateKey);
        
        hederaClient = Client.forTestnet()
            .setOperator(accountId, privateKey);
        
        logger.info('Hedera client initialized successfully');
    } else {
        logger.warn('Hedera client not initialized - please provide valid HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY environment variables');
    }
} catch (error) {
    logger.error('Failed to initialize Hedera client:', error);
}

// Security Monitoring and Alerting
const securityEvents = [];
const vulnerabilityReports = [];

function logSecurityEvent(eventType, description, severity, metadata = {}) {
    const event = {
        timestamp: new Date(),
        eventType,
        description,
        severity, // 1-5 scale
        metadata,
        ip: metadata.ip || 'unknown',
        userAgent: metadata.userAgent || 'unknown'
    };
    
    securityEvents.push(event);
    logger.warn(`Security Event: ${eventType} - ${description}`, event);
    
    // Alert for high severity events
    if (severity >= 4) {
        logger.error(`HIGH SEVERITY SECURITY ALERT: ${eventType}`, event);
        // Here you could integrate with external alerting systems
    }
}

function reportVulnerability(vulnerabilityType, description, severity, affectedComponent) {
    const report = {
        timestamp: new Date(),
        vulnerabilityType,
        description,
        severity,
        affectedComponent,
        status: 'open'
    };
    
    vulnerabilityReports.push(report);
    logger.error(`Vulnerability Reported: ${vulnerabilityType}`, report);
}

// Security Middleware
app.use((req, res, next) => {
    // Log suspicious requests
    const suspiciousPatterns = [
        /\.\.\//, // Path traversal
        /<script/i, // XSS attempts
        /union\s+select/i, // SQL injection
        /eval\s*\(/i, // Code injection
        /javascript:/i // JavaScript protocol
    ];
    
    const requestString = JSON.stringify(req.body) + req.url + JSON.stringify(req.query);
    
    for (const pattern of suspiciousPatterns) {
        if (pattern.test(requestString)) {
            logSecurityEvent('SUSPICIOUS_REQUEST', 'Potential attack detected', 3, {
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                url: req.url,
                body: req.body,
                query: req.query
            });
            break;
        }
    }
    
    next();
});

// Input Validation Middleware
const { body, validationResult } = require('express-validator');

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logSecurityEvent('VALIDATION_ERROR', 'Invalid input detected', 2, {
            ip: req.ip,
            errors: errors.array()
        });
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid input',
            errors: errors.array() 
        });
    }
    next();
};

// Import route modules
const medicalRecordsRoutes = require('./routes/medicalRecords');
const coldChainRoutes = require('./routes/coldChain');
const consentsRoutes = require('./routes/consents');

// Routes
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        hederaStatus: hederaClient ? 'connected' : 'disconnected'
    });
});

// Integrate existing route modules
app.use('/api/medical-records', medicalRecordsRoutes);
app.use('/api/coldchain', coldChainRoutes);
app.use('/api/consents', consentsRoutes);

// Security Dashboard Routes
app.get('/api/security/events', (req, res) => {
    const { severity, limit = 100 } = req.query;
    let filteredEvents = securityEvents;
    
    if (severity) {
        filteredEvents = securityEvents.filter(event => event.severity >= parseInt(severity));
    }
    
    res.json({
        success: true,
        data: filteredEvents.slice(-limit),
        total: filteredEvents.length
    });
});

app.get('/api/security/vulnerabilities', (req, res) => {
    res.json({
        success: true,
        data: vulnerabilityReports,
        total: vulnerabilityReports.length
    });
});

app.post('/api/security/report', [
    body('vulnerabilityType').notEmpty().trim().escape(),
    body('description').notEmpty().trim().escape(),
    body('severity').isInt({ min: 1, max: 5 }),
    body('affectedComponent').notEmpty().trim().escape()
], validateInput, (req, res) => {
    const { vulnerabilityType, description, severity, affectedComponent } = req.body;
    
    reportVulnerability(vulnerabilityType, description, severity, affectedComponent);
    
    res.json({
        success: true,
        message: 'Vulnerability reported successfully'
    });
});

// Hedera Integration Routes
app.post('/api/hedera/transaction', [
    body('transactionType').notEmpty().trim().escape(),
    body('data').notEmpty()
], validateInput, async (req, res) => {
    try {
        const { transactionType, data } = req.body;
        
        if (!hederaClient) {
            return res.status(500).json({
                success: false,
                message: 'Hedera client not initialized'
            });
        }
        
        // Here you would implement specific Hedera transaction logic
        // based on the transactionType
        
        logger.info(`Hedera transaction initiated: ${transactionType}`, { data });
        
        res.json({
            success: true,
            message: 'Transaction initiated successfully',
            transactionType
        });
        
    } catch (error) {
        logger.error('Hedera transaction error:', error);
        logSecurityEvent('HEDERA_ERROR', 'Transaction failed', 2, { error: error.message });
        
        res.status(500).json({
            success: false,
            message: 'Transaction failed',
            error: error.message
        });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err);
    
    logSecurityEvent('SYSTEM_ERROR', 'Unhandled error occurred', 3, {
        error: err.message,
        stack: err.stack,
        ip: req.ip,
        url: req.url
    });
    
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 Handler
app.use('*', (req, res) => {
    logSecurityEvent('NOT_FOUND', 'Route not found', 1, {
        ip: req.ip,
        url: req.originalUrl,
        method: req.method
    });
    
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Scheduled Security Tasks
cron.schedule('0 */6 * * *', () => {
    // Check for expired security events every 6 hours
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const recentEvents = securityEvents.filter(event => event.timestamp > sixHoursAgo);
    
    if (recentEvents.length > 10) {
        logger.warn('High number of security events in last 6 hours', { count: recentEvents.length });
    }
    
    // Check for open vulnerabilities
    const openVulnerabilities = vulnerabilityReports.filter(v => v.status === 'open');
    if (openVulnerabilities.length > 0) {
        logger.warn('Open vulnerabilities detected', { count: openVulnerabilities.length });
    }
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start Server
app.listen(PORT, () => {
    logger.info(`Healthcare Platform Backend running on port ${PORT}`);
    logger.info('Security features enabled:');
    logger.info('- Helmet security headers');
    logger.info('- Rate limiting');
    logger.info('- Input validation');
    logger.info('- XSS protection');
    logger.info('- NoSQL injection protection');
    logger.info('- Security event logging');
    logger.info('- Vulnerability reporting');
    logger.info('- Hedera integration');
});

module.exports = app;
