# Movie Ticket Booking System - Microservices Backend

A complete Spring Boot microservice-based backend for a Movie Ticket Booking System.

## Technology Stack
- Java 17
- Spring Boot 3.2.0
- Spring Cloud (Eureka Discovery + Gateway)
- Spring Data MongoDB
- OpenFeign
- Maven

## Architecture

### Microservices (6 services):
1. **Eureka Discovery Server** - Port 8761
2. **API Gateway** - Port 9090
3. **User Service** - Port 8081
4. **Movie Service** - Port 8082
5. **Showtime Service** - Port 8083
6. **Booking Service** - Port 8084

## Prerequisites

1. **Java 17** - Ensure Java 17 is installed
2. **Maven** - Ensure Maven is installed
3. **MongoDB** - Must be running locally on port 27017

### Start MongoDB
```powershell
# If MongoDB is installed as a service:
net start MongoDB

# Or run MongoDB manually:
mongod
```

## Running the Services

### Option 1: Run Each Service Individually

Open **6 separate terminal windows** and run the following commands in order:

#### Terminal 1 - Eureka Server (Start First)
```powershell
cd d:\movie_app_copilot\eureka-server
mvn spring-boot:run
```
Wait until you see "Started EurekaServerApplication" then verify at: http://localhost:8761

#### Terminal 2 - API Gateway
```powershell
cd d:\movie_app_copilot\api-gateway
mvn spring-boot:run
```

#### Terminal 3 - User Service
```powershell
cd d:\movie_app_copilot\user-service
mvn spring-boot:run
```

#### Terminal 4 - Movie Service
```powershell
cd d:\movie_app_copilot\movie-service
mvn spring-boot:run
```

#### Terminal 5 - Showtime Service
```powershell
cd d:\movie_app_copilot\showtime-service
mvn spring-boot:run
```

#### Terminal 6 - Booking Service
```powershell
cd d:\movie_app_copilot\booking-service
mvn spring-boot:run
```

## Verification

### 1. Check Eureka Dashboard
Open http://localhost:8761 and verify all 5 services are registered:
- API-GATEWAY
- USER-SERVICE
- MOVIE-SERVICE
- SHOWTIME-SERVICE
- BOOKING-SERVICE

### 2. Test Endpoints via API Gateway (Port 9090)

#### User Service Endpoints
```powershell
# Create a Customer User
Invoke-RestMethod -Uri "http://localhost:9090/api/users" -Method POST -ContentType "application/json" -Body '{"name":"John Doe","email":"john@example.com","phone":"1234567890","userType":"CUSTOMER"}'

# Create a Cinema Admin User
Invoke-RestMethod -Uri "http://localhost:9090/api/users" -Method POST -ContentType "application/json" -Body '{"name":"Admin User","email":"admin@cinema.com","phone":"9876543210","userType":"CINEMA_ADMIN","cinemaId":"cinema1"}'

# Get all users
Invoke-RestMethod -Uri "http://localhost:9090/api/users" -Method GET
```

#### Movie Service Endpoints (Admin Only)
```powershell
# Add a movie
Invoke-RestMethod -Uri "http://localhost:9090/api/admin/movies" -Method POST -ContentType "application/json" -Body '{"cinemaId":"cinema1","title":"Inception","genre":"Sci-Fi","duration":148,"description":"A mind-bending thriller"}'

# Get movies by cinema
Invoke-RestMethod -Uri "http://localhost:9090/api/admin/movies/cinema1" -Method GET
```

#### Showtime Service Endpoints
```powershell
# Add a showtime (within next 7 days - e.g., November 27, 2025)
Invoke-RestMethod -Uri "http://localhost:9090/api/showtimes" -Method POST -ContentType "application/json" -Body '{"movieId":"<movie-id>","cinemaId":"cinema1","showDate":"2025-11-27","startTime":"19:30","availableSeats":100}'

# Get showtimes by movie
Invoke-RestMethod -Uri "http://localhost:9090/api/showtimes/movie/<movie-id>" -Method GET

# Get showtimes by cinema
Invoke-RestMethod -Uri "http://localhost:9090/api/showtimes/cinema/cinema1" -Method GET
```

#### Booking Service Endpoints
```powershell
# Create a booking
Invoke-RestMethod -Uri "http://localhost:9090/api/bookings" -Method POST -ContentType "application/json" -Body '{"userId":"<user-id>","cinemaId":"cinema1","movieId":"<movie-id>","showtimeId":"<showtime-id>","seatsBooked":2}'

# Get bookings by user
Invoke-RestMethod -Uri "http://localhost:9090/api/bookings/user/<user-id>" -Method GET
```

## Business Rules

1. **7-Day Constraint**: 
   - Showtimes can only be scheduled for the next 7 days
   - Bookings can only be made for showtimes within the next 7 days

2. **User Types**:
   - `CUSTOMER`: Can browse movies, view showtimes, and book tickets
   - `CINEMA_ADMIN`: Can manage movies and showtimes for their cinema

3. **Seat Management**:
   - Booking service verifies showtime availability
   - Automatically reduces available seats when booking is confirmed

## MongoDB Collections

Each service uses its own database:
- `user_db` - users collection
- `movie_db` - movies collection
- `showtime_db` - showtimes collection
- `booking_db` - bookings collection

## Troubleshooting

### Services not registering with Eureka
- Wait 30-60 seconds for registration
- Ensure Eureka Server started first
- Check logs for connection errors

### MongoDB connection errors
- Verify MongoDB is running: `mongo --version`
- Check MongoDB is listening on port 27017

### Port conflicts
- Ensure ports 8761, 9090, 8081, 8082, 8083, 8084 are available
- Check with: `netstat -ano | findstr :<port>`

## Stopping Services

Press `Ctrl+C` in each terminal window to stop the services.

## Project Structure

```
movie_app_copilot/
├── eureka-server/          # Service Discovery
├── api-gateway/            # API Gateway
├── user-service/           # User Management
├── movie-service/          # Movie Management
├── showtime-service/       # Showtime Scheduling
└── booking-service/        # Ticket Booking
```
# movies_microservices
