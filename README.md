# Healthcare Platform with Hedera Integration

## 🏥 Overview

A comprehensive, decentralized healthcare management platform that securely links patients, doctors, hospitals, and pharmacies using **Hedera Hashgraph** technology. The platform provides advanced security features, real-time audit capabilities, and automated vulnerability detection to ensure the highest standards of data protection and compliance.

## ✨ Key Features

### 🔐 Security & Compliance
- **Multi-layered Security Architecture** with role-based access control
- **Real-time Threat Detection** and automated vulnerability scanning
- **Comprehensive Audit Logging** for all system interactions
- **HIPAA & GDPR Compliance** with patient consent management
- **Encrypted Data Storage** with blockchain-based integrity verification

### 🏗️ Core Components
- **Patient Management** - Secure medical records and consent management
- **Doctor Portal** - Medical record creation and patient management
- **Hospital Management** - Facility and staff coordination
- **Pharmacy Integration** - Prescription management and drug interaction detection
- **Security Dashboard** - Real-time monitoring and threat intelligence

### 🌐 Blockchain Integration
- **Hedera Hashgraph** for immutable audit trails
- **Smart Contracts** for automated compliance and access control
- **Decentralized Identity** management
- **Tamper-proof Medical Records** with cryptographic verification

## 🚀 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** for data persistence
- **Redis** for caching and session management
- **Hedera SDK** for blockchain integration

### Frontend
- **Next.js 14** with React 18
- **Tailwind CSS** for modern UI/UX
- **Recharts** for data visualization
- **Framer Motion** for smooth animations

### Smart Contracts
- **Solidity** with OpenZeppelin security libraries
- **Hedera Smart Contract Service** for deployment
- **Role-based Access Control** with granular permissions

### Security & Monitoring
- **OWASP ZAP** for vulnerability scanning
- **Prometheus & Grafana** for system monitoring
- **Elasticsearch & Kibana** for log aggregation
- **Real-time Security Alerts** and threat detection

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Hedera Testnet account ([Create here](https://portal.hedera.com/))
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd healthcare-platform
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Hedera credentials and configuration
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend
   cd ../frontend && npm install
   
   # Smart Contracts
   cd ../contracts && npm install
   ```

4. **Deploy smart contracts**
   ```bash
   cd contracts
   npx hardhat compile
   npx hardhat run scripts/deploy.js --network hedera
   ```

5. **Start the platform**
   ```bash
   # Using Docker Compose (recommended)
   docker-compose up --build
   
   # Or manually
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

## 🌐 Access Points

- **Patient Portal**: http://localhost:3000/patient
- **Doctor Portal**: http://localhost:3000/doctor
- **Hospital Dashboard**: http://localhost:3000/hospital
- **Pharmacy Management**: http://localhost:3000/pharmacy
- **Security Dashboard**: http://localhost:3000/security
- **API Documentation**: http://localhost:3001/api/docs
- **Monitoring**: http://localhost:3002 (Grafana)
- **Logs**: http://localhost:5601 (Kibana)

## 🔒 Security Features

### Authentication & Authorization
- **JWT-based Authentication** with refresh tokens
- **Multi-factor Authentication** support
- **Role-based Access Control** (RBAC)
- **Session Management** with Redis

### Data Protection
- **End-to-end Encryption** for sensitive data
- **Input Validation** and sanitization
- **SQL Injection Protection** with parameterized queries
- **XSS Prevention** with content security policies

### Threat Detection
- **Real-time Security Monitoring** with automated alerts
- **Vulnerability Scanning** using OWASP ZAP
- **Anomaly Detection** for suspicious activities
- **Rate Limiting** and DDoS protection

### Audit & Compliance
- **Immutable Audit Logs** on Hedera blockchain
- **Patient Consent Management** with expiration tracking
- **Data Access Logging** for compliance reporting
- **Automated Compliance Checks** for HIPAA/GDPR

## 📊 Smart Contracts

### SecurityAudit.sol
- Comprehensive security event logging
- Vulnerability reporting and tracking
- Automated audit completion
- High-severity alert system

### EnhancedMedicalRecords.sol
- Secure medical record management
- Role-based access control
- Patient consent management
- Access attempt monitoring

### PharmacyManagement.sol
- Medication inventory tracking
- Prescription management
- Drug interaction detection
- Expiry date monitoring

## 🔍 Monitoring & Analytics

### Security Dashboard
- Real-time security event monitoring
- Vulnerability status tracking
- System health indicators
- Threat intelligence feeds

### Performance Metrics
- Response time monitoring
- Error rate tracking
- Resource utilization
- User activity analytics

### Compliance Reporting
- HIPAA compliance status
- GDPR compliance tracking
- Audit trail generation
- Data access reports

## 🚨 Security Alerts

The platform automatically detects and alerts on:
- **Suspicious Access Attempts**
- **Data Breach Indicators**
- **System Vulnerabilities**
- **Compliance Violations**
- **Performance Degradation**

## 📋 API Endpoints

### Security
- `GET /api/security/events` - Security event history
- `GET /api/security/vulnerabilities` - Vulnerability reports
- `POST /api/security/report` - Report new vulnerabilities

### Health
- `GET /api/health` - System health status
- `GET /api/health/hedera` - Blockchain connection status

### Hedera Integration
- `POST /api/hedera/transaction` - Execute blockchain transactions
- `GET /api/hedera/status` - Blockchain network status

## 🧪 Testing

### Security Testing
```bash
# Run security audit
npm run security-audit

# Vulnerability scanning
docker run -v $(pwd):/zap/wrk owasp/zap2docker-stable zap-baseline.py -t http://localhost:3000

# Penetration testing
npm run pentest
```

### Unit Testing
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Smart contract tests
cd contracts && npm test
```

## 🚀 Deployment

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy with production configuration
docker-compose -f docker-compose.prod.yml up -d

# Monitor deployment
docker-compose -f docker-compose.prod.yml logs -f
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure production Hedera network
- Set up SSL certificates
- Configure monitoring and alerting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Development Guidelines
- Follow security best practices
- Write comprehensive tests
- Document all API changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](wiki-link)
- **Issues**: [GitHub Issues](issues-link)
- **Security**: security@healthcare-platform.com
- **Community**: [Discord](discord-link)

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Core platform development
- ✅ Security framework implementation
- ✅ Hedera integration
- ✅ Basic monitoring

### Phase 2 (Q2 2024)
- 🔄 Advanced AI threat detection
- 🔄 Mobile applications
- 🔄 IoT device integration
- 🔄 Advanced analytics

### Phase 3 (Q3 2024)
- 📋 Multi-chain support
- 📋 Advanced compliance features
- 📋 Machine learning insights
- 📋 Global deployment

## ⚠️ Disclaimer

This platform is designed for educational and development purposes. For production healthcare use, ensure compliance with all applicable regulations and conduct thorough security audits.

---

**Built with ❤️ for secure healthcare management**
