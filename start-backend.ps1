# Movie Booking System - Backend Startup Script
# Starts all microservices in the correct order

Write-Host "🎬 Starting Movie Booking System Backend Services..." -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
$mongoProcess = Get-Process -Name mongod -ErrorAction SilentlyContinue
if (-not $mongoProcess) {
    Write-Host "❌ MongoDB is not running! Please start MongoDB first." -ForegroundColor Red
    exit 1
}
Write-Host "✓ MongoDB is running" -ForegroundColor Green

# Function to start a service
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath,
        [int]$Port
    )
    
    Write-Host "Starting $ServiceName on port $Port..." -ForegroundColor Yellow
    Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$ServicePath'; java -jar .\target\$ServiceName-1.0.0.jar"
    Start-Sleep -Seconds 3
}

# Start services in order
Write-Host "`n🔧 Starting services..." -ForegroundColor Cyan

# 1. Eureka Server (Service Registry)
Start-Service -ServiceName "eureka-server" -ServicePath "d:\movie_app_copilot\eureka-server" -Port 8761
Write-Host "Waiting for Eureka Server to be ready..." -ForegroundColor Gray
Start-Sleep -Seconds 15

# 2. User Service
Start-Service -ServiceName "user-service" -ServicePath "d:\movie_app_copilot\user-service" -Port 8081

# 3. Admin Service (formerly Movie Service)
Start-Service -ServiceName "admin-service" -ServicePath "d:\movie_app_copilot\movie-service" -Port 8082

# 4. Showtime Service
Start-Service -ServiceName "showtime-service" -ServicePath "d:\movie_app_copilot\showtime-service" -Port 8083

# 5. Booking Service
Start-Service -ServiceName "booking-service" -ServicePath "d:\movie_app_copilot\booking-service" -Port 8084

Write-Host "`nWaiting for services to register with Eureka..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# 6. API Gateway (last, after all services are up)
Start-Service -ServiceName "api-gateway" -ServicePath "d:\movie_app_copilot\api-gateway" -Port 9090

Write-Host "`n✅ All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "Services running on:" -ForegroundColor Cyan
Write-Host "  • Eureka Server:   http://localhost:8761" -ForegroundColor White
Write-Host "  • User Service:    http://localhost:8081" -ForegroundColor White
Write-Host "  • Movie Service:   http://localhost:8082" -ForegroundColor White
Write-Host "  • Showtime Service: http://localhost:8083" -ForegroundColor White
Write-Host "  • Booking Service:  http://localhost:8084" -ForegroundColor White
Write-Host "  • API Gateway:     http://localhost:9090" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press Ctrl+C in each window to stop services" -ForegroundColor Yellow
