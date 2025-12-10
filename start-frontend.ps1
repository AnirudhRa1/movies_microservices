# Movie Booking System - Quick Start Script
# This script starts the frontend dev server
# Make sure backend services are running first using start-backend.ps1

Write-Host "🎬 Starting Movie Booking Frontend..." -ForegroundColor Cyan
Write-Host ""

# Check if backend is running
try {
    $response = Invoke-WebRequest -Uri "http://localhost:9090" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
    Write-Host "✓ Backend API Gateway is running on port 9090" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Backend API Gateway not detected on port 9090" -ForegroundColor Yellow
    Write-Host "   Please start backend services first using: .\start-backend.ps1" -ForegroundColor Yellow
    Write-Host ""
}

# Check if MongoDB is running
$mongoProcess = Get-Process -Name mongod -ErrorAction SilentlyContinue
if ($mongoProcess) {
    Write-Host "✓ MongoDB is running" -ForegroundColor Green
} else {
    Write-Host "⚠️  MongoDB is not running" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting React development server..." -ForegroundColor Yellow

cd movie-booking-frontend
npm run dev
