# Generate Self-Signed SSL Certificate for Development
Write-Host "🔐 Generating self-signed SSL certificate..." -ForegroundColor Cyan

# Create certificate directory
$certDir = "nginx/ssl"
if (!(Test-Path $certDir)) {
    New-Item -ItemType Directory -Force -Path $certDir
}

# Generate private key and certificate
$certPath = "$certDir/cert.pem"
$keyPath = "$certDir/key.pem"

# Use OpenSSL if available, otherwise use PowerShell
try {
    # Try to use OpenSSL
    openssl req -x509 -newkey rsa:4096 -keyout $keyPath -out $certPath -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Healthcare Platform/CN=localhost"
    Write-Host "✅ SSL certificate generated using OpenSSL" -ForegroundColor Green
} catch {
    Write-Host "⚠️ OpenSSL not found, creating placeholder files" -ForegroundColor Yellow
    
    # Create placeholder files for now
    "-----BEGIN CERTIFICATE-----" | Out-File -FilePath $certPath -Encoding ASCII
    "PLACEHOLDER CERTIFICATE FOR DEVELOPMENT" | Out-File -FilePath $certPath -Append -Encoding ASCII
    "-----END CERTIFICATE-----" | Out-File -FilePath $certPath -Append -Encoding ASCII
    
    "-----BEGIN PRIVATE KEY-----" | Out-File -FilePath $keyPath -Encoding ASCII
    "PLACEHOLDER PRIVATE KEY FOR DEVELOPMENT" | Out-File -FilePath $keyPath -Append -Encoding ASCII
    "-----END PRIVATE KEY-----" | Out-File -FilePath $keyPath -Append -Encoding ASCII
    
    Write-Host "⚠️ Created placeholder SSL files. Replace with real certificates for production." -ForegroundColor Yellow
}

Write-Host "🔐 SSL certificate files created in $certDir" -ForegroundColor Green
Write-Host "📁 Certificate: $certPath" -ForegroundColor Cyan
Write-Host "🔑 Private Key: $keyPath" -ForegroundColor Cyan
