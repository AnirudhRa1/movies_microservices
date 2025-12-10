# Movie Booking System - Backend Management Commands

## 🛑 Stop All Backend Services

### Option 1: Stop All Java Processes (Quickest)
```powershell
# Kill all Java processes
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# Verify all stopped
Get-Process java -ErrorAction SilentlyContinue
```

### Option 2: Stop Individual Service Windows
```powershell
# Press Ctrl+C in each terminal window running the services
# Or close the terminal windows
```

---

## 🔄 Rebuild All Services

```powershell
# Navigate to project root
cd d:\movie_app_copilot

# Stop any running services first
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# Build all services (using mvnd - Maven Daemon)
cd eureka-server
mvnd clean package -DskipTests

cd ..\api-gateway
mvnd clean package -DskipTests

cd ..\user-service
mvnd clean package -DskipTests

cd ..\movie-service
mvnd clean package -DskipTests

cd ..\showtime-service
mvnd clean package -DskipTests

cd ..\booking-service
mvnd clean package -DskipTests

cd ..
```

---

## 🚀 Start All Backend Services

### Option 1: Using the Startup Script (Recommended)
```powershell
cd d:\movie_app_copilot
.\start-backend.ps1
```

### Option 2: Manual Start (Individual Windows)

**Terminal 1 - Eureka Server:**
```powershell
cd d:\movie_app_copilot\eureka-server
java -jar .\target\eureka-server-1.0.0.jar
```

**Wait 15-20 seconds, then start other services...**

**Terminal 2 - User Service:**
```powershell
cd d:\movie_app_copilot\user-service
java -jar .\target\user-service-1.0.0.jar
```

**Terminal 3 - Movie Service:**
```powershell
cd d:\movie_app_copilot\movie-service
java -jar .\target\movie-service-1.0.0.jar
```

**Terminal 4 - Showtime Service:**
```powershell
cd d:\movie_app_copilot\showtime-service
java -jar .\target\showtime-service-1.0.0.jar
```

**Terminal 5 - Booking Service:**
```powershell
cd d:\movie_app_copilot\booking-service
java -jar .\target\booking-service-1.0.0.jar
```

**Wait 10 seconds for services to register with Eureka...**

**Terminal 6 - API Gateway:**
```powershell
cd d:\movie_app_copilot\api-gateway
java -jar .\target\api-gateway-1.0.0.jar
```

---

## ⚡ Complete Restart Workflow

### Quick Restart (No Rebuild)
```powershell
# 1. Stop all services
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Wait a moment
Start-Sleep -Seconds 2

# 3. Start all services
cd d:\movie_app_copilot
.\start-backend.ps1
```

### Full Restart (With Rebuild)
```powershell
# 1. Stop all services
cd d:\movie_app_copilot
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Rebuild specific service (e.g., API Gateway with CORS fix)
cd api-gateway
mvnd clean package -DskipTests

# 3. Rebuild all other services
cd ..\eureka-server
mvnd clean package -DskipTests

cd ..\user-service
mvnd clean package -DskipTests

cd ..\movie-service
mvnd clean package -DskipTests

cd ..\showtime-service
mvnd clean package -DskipTests

cd ..\booking-service
mvnd clean package -DskipTests

# 4. Start all services
cd ..
.\start-backend.ps1
```

---

## 🔍 Check Service Status

### Check Running Java Processes
```powershell
Get-Process java -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime
```

### Check Specific Ports
```powershell
# Check all service ports
Get-NetTCPConnection -LocalPort 8761,9090,8081,8082,8083,8084 -ErrorAction SilentlyContinue | 
  Select-Object LocalPort, State, OwningProcess | 
  Format-Table
```

### Test API Gateway
```powershell
# Test if API Gateway is responding
Invoke-WebRequest -Uri "http://localhost:9090/actuator/health" -UseBasicParsing
```

### View Eureka Dashboard
```powershell
# Open Eureka in browser
Start-Process "http://localhost:8761"
```

### Test User Service via Gateway
```powershell
# Get all users
Invoke-RestMethod -Uri "http://localhost:9090/api/users" -Method GET
```

---

## 🧹 Clean Build (If Services Won't Stop)

```powershell
# Force kill all Java processes
Get-Process java -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean all target directories
Remove-Item -Path "d:\movie_app_copilot\eureka-server\target" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\movie_app_copilot\api-gateway\target" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\movie_app_copilot\user-service\target" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\movie_app_copilot\movie-service\target" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\movie_app_copilot\showtime-service\target" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "d:\movie_app_copilot\booking-service\target" -Recurse -Force -ErrorAction SilentlyContinue

# Rebuild all
cd d:\movie_app_copilot
.\start-backend.ps1
```

---

## 🐛 Troubleshooting

### Services Won't Start
```powershell
# 1. Check MongoDB is running
Get-Process mongod -ErrorAction SilentlyContinue

# 2. If not running, start MongoDB
# (Adjust path to your MongoDB installation)
Start-Process "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"

# 3. Check ports are not in use
Get-NetTCPConnection -LocalPort 8761 -ErrorAction SilentlyContinue
```

### Service Stuck on Port
```powershell
# Find process using port (e.g., 9090)
$port = 9090
$processId = (Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue).OwningProcess
if ($processId) {
    Stop-Process -Id $processId -Force
    Write-Host "Killed process $processId using port $port"
}
```

### View Service Logs
```powershell
# Check the terminal window where service is running
# Logs appear in real-time in each terminal
```

### 503 Service Unavailable Error
This means services haven't registered with Eureka yet. Wait 30-60 seconds after starting.

```powershell
# Check Eureka dashboard to see registered services
Start-Process "http://localhost:8761"
```

---

## 📊 Service Startup Order

**IMPORTANT:** Always start in this order:

1. **Eureka Server** (Port 8761) - Service Registry
   - Wait 15-20 seconds
2. **Microservices** (Ports 8081-8084) - Can start together
   - User Service (8081)
   - Movie Service (8082)
   - Showtime Service (8083)
   - Booking Service (8084)
   - Wait 10 seconds for registration
3. **API Gateway** (Port 9090) - Last!
   - Needs services to be registered first

---

## 🎯 Quick Reference

| Service | Port | Start Command | Build Command |
|---------|------|---------------|---------------|
| Eureka Server | 8761 | `java -jar .\target\eureka-server-1.0.0.jar` | `mvnd clean package -DskipTests` |
| API Gateway | 9090 | `java -jar .\target\api-gateway-1.0.0.jar` | `mvnd clean package -DskipTests` |
| User Service | 8081 | `java -jar .\target\user-service-1.0.0.jar` | `mvnd clean package -DskipTests` |
| Movie Service | 8082 | `java -jar .\target\movie-service-1.0.0.jar` | `mvnd clean package -DskipTests` |
| Showtime Service | 8083 | `java -jar .\target\showtime-service-1.0.0.jar` | `mvnd clean package -DskipTests` |
| Booking Service | 8084 | `java -jar .\target\booking-service-1.0.0.jar` | `mvnd clean package -DskipTests` |

---

## 🔗 Important URLs

- **Eureka Dashboard:** http://localhost:8761
- **API Gateway:** http://localhost:9090
- **API Base URL:** http://localhost:9090/api
- **Frontend:** http://localhost:5173

---

**Pro Tip:** Use the `start-backend.ps1` script for easiest startup! It handles the correct order and timing automatically.
