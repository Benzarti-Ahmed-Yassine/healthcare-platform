# Healthcare Platform Deployment Script
# This script will start all services using Docker Compose

Write-Host "🏥 Healthcare Platform - Starting Deployment..." -ForegroundColor Cyan

# Check if Docker is running
try {
    docker version | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is available
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Compose is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not available. Please install Docker Compose." -ForegroundColor Red
    exit 1
}

# Create necessary directories
Write-Host "📁 Creating necessary directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "logs" | Out-Null
New-Item -ItemType Directory -Force -Path "uploads" | Out-Null
New-Item -ItemType Directory -Force -Path "security-reports" | Out-Null
New-Item -ItemType Directory -Force -Path "monitoring" | Out-Null

# Build and start services
Write-Host "🚀 Building and starting services..." -ForegroundColor Yellow
docker-compose up --build -d

# Wait for services to be ready
Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Check service status
Write-Host "🔍 Checking service status..." -ForegroundColor Yellow
docker-compose ps

Write-Host ""
Write-Host "🎉 Healthcare Platform is starting up!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:3001" -ForegroundColor Cyan
Write-Host "🗄️ MongoDB: localhost:27017" -ForegroundColor Cyan
Write-Host "🔴 Redis: localhost:6379" -ForegroundColor Cyan
Write-Host "📊 Grafana: http://localhost:3002 (admin/admin123)" -ForegroundColor Cyan
Write-Host "📈 Prometheus: http://localhost:9090" -ForegroundColor Cyan
Write-Host "🔍 Kibana: http://localhost:5601" -ForegroundColor Cyan
Write-Host "🛡️ OWASP ZAP: http://localhost:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 To view logs: docker-compose logs -f [service-name]" -ForegroundColor Yellow
Write-Host "💡 To stop: docker-compose down" -ForegroundColor Yellow
Write-Host "💡 To restart: docker-compose restart" -ForegroundColor Yellow
