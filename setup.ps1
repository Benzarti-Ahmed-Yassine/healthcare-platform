# Healthcare Platform Setup Script for Windows
Write-Host "🏥 Healthcare Platform Setup" -ForegroundColor Green

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

# Check Docker
try {
    docker --version | Out-Null
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check Node.js
try {
    node --version | Out-Null
    Write-Host "✅ Node.js is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check npm
try {
    npm --version | Out-Null
    Write-Host "✅ npm is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm first." -ForegroundColor Red
    exit 1
}

# Create necessary directories
Write-Host "Creating directories..." -ForegroundColor Yellow

$directories = @(
    "logs",
    "uploads", 
    "security-reports",
    "monitoring",
    "nginx/ssl",
    "mongo-init"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✅ Created directory: $dir" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ Directory already exists: $dir" -ForegroundColor Blue
    }
}

# Create .env file
Write-Host "Creating .env file..." -ForegroundColor Yellow

$envContent = @"
# Healthcare Platform Environment Configuration
# Update these values with your actual credentials

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://mongo:27017/healthcare
REDIS_URL=redis://:secure_redis_password_123@redis:6379

# Hedera Configuration
HEDERA_NETWORK=testnet
HEDERA_ACCOUNT_ID=your_account_id_here
HEDERA_PRIVATE_KEY=your_private_key_here
HEDERA_OPERATOR_ID=your_operator_id_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_here_change_this_in_production
JWT_EXPIRES_IN=24h

# Security Configuration
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SLOW_DOWN_DELAY_MS=1000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
ALLOWED_FILE_TYPES=pdf,doc,docx,jpg,jpeg,png

# Logging Configuration
LOG_LEVEL=info
LOG_FILE_PATH=./logs
LOG_MAX_SIZE=10485760
LOG_MAX_FILES=5

# Monitoring Configuration
PROMETHEUS_PORT=9090
GRAFANA_PORT=3002
ELASTICSEARCH_PORT=9200
KIBANA_PORT=5601

# Security Scanner Configuration
OWASP_ZAP_PORT=8080
SECURITY_SCAN_INTERVAL=3600000

# IMPORTANT: Update the Hedera credentials above before running the platform
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8
Write-Host "✅ Created .env file" -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
npm install
Set-Location ..

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install
Set-Location ..

# Install smart contract dependencies
Write-Host "Installing smart contract dependencies..." -ForegroundColor Yellow
Set-Location contracts
npm install
Set-Location ..

# Setup logging structure
Write-Host "Setting up logging structure..." -ForegroundColor Yellow
New-Item -ItemType File -Path "logs/backend.log" -Force | Out-Null
New-Item -ItemType File -Path "logs/frontend.log" -Force | Out-Null
New-Item -ItemType File -Path "logs/security.log" -Force | Out-Null
New-Item -ItemType File -Path "logs/nginx.log" -Force | Out-Null

# Create nginx configuration
Write-Host "Creating nginx configuration..." -ForegroundColor Yellow
$nginxConfig = @"
events {
    worker_connections 1024;
}

http {
    upstream backend {
        server backend:3001;
    }

    upstream frontend {
        server frontend:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location /api/ {
            proxy_pass http://backend;
            proxy_set_header Host `$host;
            proxy_set_header X-Real-IP `$remote_addr;
            proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto `$scheme;
        }

        location / {
            proxy_pass http://frontend;
            proxy_set_header Host `$host;
            proxy_set_header X-Real-IP `$remote_addr;
            proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto `$scheme;
        }
    }
}
"@

$nginxConfig | Out-File -FilePath "nginx/nginx.conf" -Encoding UTF8

# Create Prometheus configuration
Write-Host "Creating Prometheus configuration..." -ForegroundColor Yellow
$prometheusConfig = @"
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend:3001']

  - job_name: 'frontend'
    static_configs:
      - targets: ['frontend:3000']
"@

$prometheusConfig | Out-File -FilePath "monitoring/prometheus.yml" -Encoding UTF8

# Create security monitor service
Write-Host "Creating security monitor service..." -ForegroundColor Yellow

$securityMonitorDockerfile = @"
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["npm", "start"]
"@

$securityMonitorDockerfile | Out-File -FilePath "security-monitor/Dockerfile" -Encoding UTF8

$securityMonitorPackage = @"
{
  "name": "security-monitor",
  "version": "1.0.0",
  "description": "Security monitoring service for healthcare platform",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "winston": "^3.11.0"
  }
}
"@

$securityMonitorPackage | Out-File -FilePath "security-monitor/package.json" -Encoding UTF8

Write-Host "🎉 Setup completed successfully!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Update the .env file with your Hedera credentials" -ForegroundColor White
Write-Host "2. Deploy smart contracts: cd contracts && npx hardhat run scripts/deploy.js --network hedera" -ForegroundColor White
Write-Host "3. Start the platform: docker-compose up --build" -ForegroundColor White

Write-Host "`nAccess points:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "- Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "- Security Dashboard: http://localhost:3000/security" -ForegroundColor White
Write-Host "- Grafana: http://localhost:3002" -ForegroundColor White
Write-Host "- Kibana: http://localhost:5601" -ForegroundColor White

Write-Host "`nImportant Security Notes:" -ForegroundColor Red
Write-Host "- Change default passwords in .env file" -ForegroundColor White
Write-Host "- Use strong JWT secrets in production" -ForegroundColor White
Write-Host "- Enable HTTPS in production" -ForegroundColor White
Write-Host "- Regularly update dependencies" -ForegroundColor White
