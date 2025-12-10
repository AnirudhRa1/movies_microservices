# Movie Booking System - API Documentation

## 🏗️ Microservices Architecture

### Architecture Overview

The Movie Booking System uses a **microservices architecture** with the following components:

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (React App)                       │
│                  http://localhost:5173                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ All requests go through
                         │ single endpoint
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Gateway (Port 9090)                   │
│              http://localhost:9090/api/**                    │
│                                                              │
│  • Routes requests to appropriate microservices             │
│  • CORS handling                                            │
│  • Load balancing (via Eureka)                              │
│  • Single entry point for all APIs                          │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Service Discovery
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Eureka Server (Port 8761)                       │
│          http://localhost:8761                               │
│                                                              │
│  • Service Registry                                         │
│  • Health monitoring                                        │
│  • Dynamic service location                                 │
└─────────┬────────────┬────────────┬─────────────────────────┘
          │            │            │            │
    ┌─────▼───┐  ┌────▼────┐  ┌───▼─────┐  ┌──▼──────┐
    │  User   │  │  Movie  │  │Showtime │  │ Booking │
    │ Service │  │ Service │  │ Service │  │ Service │
    │  :8081  │  │  :8082  │  │  :8083  │  │  :8084  │
    └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘
         │            │             │             │
         └────────────┴─────────────┴─────────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │    MongoDB      │
                 │   Port 27017    │
                 └─────────────────┘
```

### How API Gateway Works (No Hardcoded Ports)

The API Gateway uses **Spring Cloud Gateway** with **Eureka Service Discovery** to route requests:

#### 1. **Service Registration**
Each microservice registers itself with Eureka Server on startup:
- User Service registers as `USER-SERVICE`
- Movie Service registers as `MOVIE-SERVICE`
- Showtime Service registers as `SHOWTIME-SERVICE`
- Booking Service registers as `BOOKING-SERVICE`

#### 2. **Dynamic Routing**
API Gateway configuration (`application.properties`):

```properties
# Enable discovery-based routing
spring.cloud.gateway.discovery.locator.enabled=true
spring.cloud.gateway.discovery.locator.lower-case-service-id=true

# Route to User Service (no hardcoded port!)
spring.cloud.gateway.routes[0].id=user-service
spring.cloud.gateway.routes[0].uri=lb://USER-SERVICE  # ← Load Balanced URI
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/users/**

# Route to Movie Service
spring.cloud.gateway.routes[1].id=movie-service
spring.cloud.gateway.routes[1].uri=lb://MOVIE-SERVICE
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/admin/movies/**

# Route to Showtime Service
spring.cloud.gateway.routes[2].id=showtime-service
spring.cloud.gateway.routes[2].uri=lb://SHOWTIME-SERVICE
spring.cloud.gateway.routes[2].predicates[0]=Path=/api/showtimes/**

# Route to Booking Service
spring.cloud.gateway.routes[3].id=booking-service
spring.cloud.gateway.routes[3].uri=lb://BOOKING-SERVICE
spring.cloud.gateway.routes[3].predicates[0]=Path=/api/bookings/**
```

**Key Points:**
- `lb://SERVICE-NAME` = Load Balanced URI
- Gateway queries Eureka to find the actual IP:PORT of services
- No hardcoded ports in configuration
- Supports multiple instances of the same service (load balancing)
- Services can run on any available port

#### 3. **Request Flow Example**

When frontend makes: `POST http://localhost:9090/api/users`

1. Request hits **API Gateway** (port 9090)
2. Gateway checks route: `/api/users/**` → `USER-SERVICE`
3. Gateway queries **Eureka**: "Where is USER-SERVICE?"
4. Eureka responds: "USER-SERVICE is at localhost:8081"
5. Gateway forwards request to `http://localhost:8081/api/users`
6. User Service processes request and returns response
7. Gateway returns response to frontend

---

## 📡 Complete API Reference

### Base URL
**All requests go through the API Gateway:**
```
http://localhost:9090/api
```

**Frontend Configuration:**
```env
VITE_API_BASE_URL=http://localhost:9090/api
```

---

## 👤 User Service APIs

**Service Port:** 8081 (accessed via Gateway)  
**Base Path:** `/api/users`

### 1. Create User (Register)
```http
POST /api/users
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "userType": "CUSTOMER"  // or "CINEMA_ADMIN"
}
```

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "userType": "CUSTOMER"
}
```

### 2. Get All Users
```http
GET /api/users
```

**Response:** `200 OK`
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe",
    "phoneNumber": "+1234567890",
    "userType": "CUSTOMER"
  }
]
```

### 3. Get User by ID
```http
GET /api/users/{id}
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439011",
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "phoneNumber": "+1234567890",
  "userType": "CUSTOMER"
}
```

### 4. Update User
```http
PUT /api/users/{id}
```

**Request Body:**
```json
{
  "fullName": "John Updated Doe",
  "phoneNumber": "+1234567890"
}
```

**Response:** `200 OK`

### 5. Delete User
```http
DELETE /api/users/{id}
```

**Response:** `204 No Content`

---

## 🎬 Movie Service APIs

**Service Port:** 8082 (accessed via Gateway)  
**Base Path:** `/api/admin/movies`

### 1. Create Movie
```http
POST /api/admin/movies
```

**Request Body:**
```json
{
  "title": "Inception",
  "description": "A thief who steals corporate secrets through dream-sharing technology",
  "genre": "Sci-Fi",
  "language": "English",
  "duration": 148,
  "releaseDate": "2010-07-16",
  "rating": "PG-13",
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  "posterUrl": "https://example.com/inception.jpg",
  "trailerUrl": "https://youtube.com/watch?v=...",
  "cinemaId": "cinema123"
}
```

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439022",
  "title": "Inception",
  "description": "A thief who steals corporate secrets through dream-sharing technology",
  "genre": "Sci-Fi",
  "language": "English",
  "duration": 148,
  "releaseDate": "2010-07-16",
  "rating": "PG-13",
  "director": "Christopher Nolan",
  "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
  "posterUrl": "https://example.com/inception.jpg",
  "trailerUrl": "https://youtube.com/watch?v=...",
  "cinemaId": "cinema123"
}
```

### 2. Get All Movies
```http
GET /api/admin/movies
```

**Response:** `200 OK` (Array of movies)

### 3. Get Movie by ID
```http
GET /api/admin/movies/{id}
```

**Response:** `200 OK`

### 4. Get Movies by Cinema
```http
GET /api/admin/movies/cinema/{cinemaId}
```

**Response:** `200 OK` (Array of movies for specific cinema)

### 5. Update Movie
```http
PUT /api/admin/movies/{id}
```

**Request Body:** (Same as create, all fields optional)

**Response:** `200 OK`

### 6. Delete Movie
```http
DELETE /api/admin/movies/{id}
```

**Response:** `204 No Content`

---

## 🎭 Showtime Service APIs

**Service Port:** 8083 (accessed via Gateway)  
**Base Path:** `/api/showtimes`

### 1. Create Showtime
```http
POST /api/showtimes
```

**Request Body:**
```json
{
  "movieId": "507f1f77bcf86cd799439022",
  "cinemaId": "cinema123",
  "screenNumber": 1,
  "showDateTime": "2025-11-28T19:30:00",
  "price": 250.00,
  "availableSeats": 100,
  "totalSeats": 100
}
```

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439033",
  "movieId": "507f1f77bcf86cd799439022",
  "cinemaId": "cinema123",
  "screenNumber": 1,
  "showDateTime": "2025-11-28T19:30:00",
  "price": 250.00,
  "availableSeats": 100,
  "totalSeats": 100
}
```

### 2. Get All Showtimes
```http
GET /api/showtimes
```

**Response:** `200 OK` (Array of showtimes)

### 3. Get Showtime by ID
```http
GET /api/showtimes/{id}
```

**Response:** `200 OK`

### 4. Get Showtimes by Movie
```http
GET /api/showtimes/movie/{movieId}
```

**Response:** `200 OK` (Array of showtimes for specific movie)

### 5. Reduce Available Seats (For Booking)
```http
PUT /api/showtimes/{id}/reduce?count={numberOfSeats}
```

**Example:**
```http
PUT /api/showtimes/507f1f77bcf86cd799439033/reduce?count=3
```

**Response:** `200 OK`
```json
{
  "id": "507f1f77bcf86cd799439033",
  "availableSeats": 97,  // Reduced by 3
  "totalSeats": 100
}
```

### 6. Delete Showtime
```http
DELETE /api/showtimes/{id}
```

**Response:** `204 No Content`

---

## 🎫 Booking Service APIs

**Service Port:** 8084 (accessed via Gateway)  
**Base Path:** `/api/bookings`

### 1. Create Booking
```http
POST /api/bookings
```

**Request Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "showtimeId": "507f1f77bcf86cd799439033",
  "seats": ["A1", "A2", "A3"],
  "totalPrice": 750.00,
  "bookingDate": "2025-11-27T10:30:00",
  "status": "CONFIRMED"
}
```

**Response:** `201 Created`
```json
{
  "id": "507f1f77bcf86cd799439044",
  "userId": "507f1f77bcf86cd799439011",
  "showtimeId": "507f1f77bcf86cd799439033",
  "seats": ["A1", "A2", "A3"],
  "totalPrice": 750.00,
  "bookingDate": "2025-11-27T10:30:00",
  "status": "CONFIRMED"
}
```

### 2. Get All Bookings
```http
GET /api/bookings
```

**Response:** `200 OK` (Array of all bookings)

### 3. Get Booking by ID
```http
GET /api/bookings/{id}
```

**Response:** `200 OK`

### 4. Get Bookings by User
```http
GET /api/bookings/user/{userId}
```

**Response:** `200 OK` (Array of user's bookings)

### 5. Cancel Booking (Delete)
```http
DELETE /api/bookings/{id}
```

**Response:** `204 No Content`

---

## 🔧 Service Discovery & Monitoring

### Eureka Dashboard
```
http://localhost:8761
```

**Features:**
- View all registered services
- Check service health status
- Monitor service instances
- View service metadata

---

## 🚀 Complete Booking Flow

### Step-by-Step Booking Process

1. **User Registration**
   ```http
   POST /api/users
   ```

2. **Browse Movies**
   ```http
   GET /api/admin/movies
   ```

3. **View Showtimes for Movie**
   ```http
   GET /api/showtimes/movie/{movieId}
   ```

4. **Select Showtime & Check Availability**
   ```http
   GET /api/showtimes/{showtimeId}
   ```
   Check `availableSeats` field

5. **Reduce Seats (Atomic Operation)**
   ```http
   PUT /api/showtimes/{showtimeId}/reduce?count=3
   ```

6. **Create Booking**
   ```http
   POST /api/bookings
   ```

7. **View User's Bookings**
   ```http
   GET /api/bookings/user/{userId}
   ```

---

## 🔒 Error Handling

### Common HTTP Status Codes

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service not registered or down

### Error Response Format
```json
{
  "timestamp": "2025-11-27T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users"
}
```

---

## 📝 Important Notes

### Business Rules

1. **7-Day Booking Window**
   - Showtimes can only be created for next 7 days
   - Frontend validates date range
   - Backend should also validate

2. **Seat Management**
   - Use atomic `reduce` operation for booking
   - Prevents race conditions
   - Always check availability before booking

3. **User Types**
   - `CUSTOMER` - Regular users (book tickets)
   - `CINEMA_ADMIN` - Admin users (manage movies/showtimes)

4. **No Authentication** (Current Implementation)
   - For demo purposes only
   - Production should use JWT tokens
   - Add Spring Security with OAuth2

### Service Ports (For Development Only)

These ports are **not exposed to frontend** - only API Gateway (9090) is used:

- Eureka Server: 8761
- User Service: 8081
- Movie Service: 8082
- Showtime Service: 8083
- Booking Service: 8084
- API Gateway: **9090** ← **Single entry point**

### CORS Configuration

API Gateway allows requests from:
- `http://localhost:5173` (React dev server)
- `http://localhost:3000` (Alternative React port)

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

---

## 🧪 Testing APIs

### Using cURL

```bash
# Create User
curl -X POST http://localhost:9090/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phoneNumber": "+1234567890",
    "userType": "CUSTOMER"
  }'

# Get All Movies
curl http://localhost:9090/api/admin/movies

# Create Showtime
curl -X POST http://localhost:9090/api/showtimes \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": "MOVIE_ID_HERE",
    "cinemaId": "cinema123",
    "screenNumber": 1,
    "showDateTime": "2025-11-28T19:30:00",
    "price": 250.00,
    "availableSeats": 100,
    "totalSeats": 100
  }'
```

### Using PowerShell

```powershell
# Create User
Invoke-RestMethod -Uri "http://localhost:9090/api/users" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"username":"testuser","email":"test@example.com","password":"password123","fullName":"Test User","phoneNumber":"+1234567890","userType":"CUSTOMER"}'

# Get All Movies
Invoke-RestMethod -Uri "http://localhost:9090/api/admin/movies" -Method GET
```

---

## 🎯 Frontend Integration

The React frontend is configured to use only the API Gateway:

```typescript
// .env
VITE_API_BASE_URL=http://localhost:9090/api

// axiosClient.ts
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call
const createUser = async (userData: UserDTO): Promise<User> => {
  const response = await axiosClient.post('/users', userData);
  return response.data;
};
```

**No hardcoded service ports in frontend code!** ✅

---

## 🔄 Scalability

The microservices architecture supports:

1. **Horizontal Scaling**
   - Run multiple instances of any service
   - API Gateway load balances automatically
   - Example: Run 3 User Service instances on different ports

2. **Service Independence**
   - Each service has its own database
   - Can be deployed independently
   - Different technologies can be used per service

3. **Fault Tolerance**
   - If one service instance fails, others continue
   - Circuit breakers can be added
   - Retry mechanisms via Spring Cloud

---

## 📚 Additional Resources

- **Spring Cloud Gateway**: https://spring.io/projects/spring-cloud-gateway
- **Eureka Service Discovery**: https://spring.io/projects/spring-cloud-netflix
- **MongoDB**: https://www.mongodb.com/docs/

---

**Last Updated:** November 27, 2025  
**Version:** 1.0.0
