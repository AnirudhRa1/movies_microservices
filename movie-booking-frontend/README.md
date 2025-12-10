# Movie Booking System - Frontend

A full-featured React frontend for booking movie tickets, built with Vite, React, TypeScript, Tailwind CSS, and integrated with a Spring Boot microservices backend.

## 🎬 Features

- **User Authentication**: Login and registration for customers
- **Movie Browsing**: Search and filter movies by genre, language, and more
- **Showtime Selection**: View available showtimes for the next 7 days
- **Seat Selection**: Interactive seat picker with real-time availability
- **Booking Management**: Complete booking flow with confirmation and QR code
- **Admin Dashboard**: Cinema admins can manage movies and showtimes
- **Responsive Design**: Mobile-first design with dark theme
- **State Management**: Zustand for lightweight global state
- **API Caching**: React Query for efficient data fetching

## 🛠️ Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router v6
- **HTTP Client**: Axios 1.6
- **State Management**: Zustand 4.5
- **Data Fetching**: TanStack React Query 5.20
- **Forms**: Formik 2.4 + Yup 1.3 validation
- **Icons**: Lucide React 0.321
- **QR Codes**: qrcode.react 3.1
- **Date Utilities**: date-fns 3.3

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── axiosClient.ts     # Axios instance with interceptors
│   ├── userApi.ts         # User service endpoints
│   ├── movieApi.ts        # Movie service endpoints
│   ├── showtimeApi.ts     # Showtime service endpoints
│   └── bookingApi.ts      # Booking service endpoints
├── components/             # Reusable components
│   ├── NavBar.tsx         # Navigation bar with search
│   ├── Footer.tsx         # Footer with links
│   ├── MovieCard.tsx      # Movie display card
│   ├── SeatSelector.tsx   # Interactive seat selection
│   ├── ShowtimeCard.tsx   # Showtime display card
│   ├── Loading.tsx        # Loading indicator
│   └── Modal.tsx          # Modal dialog
├── pages/                  # Page components
│   ├── Home.tsx           # Landing page
│   ├── Movies.tsx         # Movies listing with filters
│   ├── MovieDetails.tsx   # Movie details and showtimes
│   ├── BookingPage.tsx    # Seat selection and booking
│   ├── BookingSuccess.tsx # Booking confirmation
│   ├── UserLogin.tsx      # User login
│   ├── UserRegister.tsx   # User registration
│   ├── AdminMovies.tsx    # Admin movie management
│   └── UserBookings.tsx   # User's booking history
├── store/                  # State management
│   └── index.ts           # Zustand store
├── types/                  # TypeScript types
│   └── index.ts           # Shared type definitions
├── utils/                  # Utility functions
│   ├── helpers.ts         # Helper functions
│   └── constants.ts       # App constants
├── App.tsx                 # Main app component with routing
├── main.tsx               # App entry point
└── index.css              # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** installed
- **Backend services** running on `http://localhost:9090`

### Installation

1. **Navigate to the frontend directory**:
   ```bash
   cd movie-booking-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure the API URL** (already set to default):
   ```env
   VITE_API_BASE_URL=http://localhost:9090/api
   ```

### Running the Application

**Development mode**:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

**Build for production**:
```bash
npm run build
```

**Preview production build**:
```bash
npm run preview
```

## 📋 Usage Guide

### For Customers

1. **Browse Movies**:
   - Visit the home page to see featured movies
   - Use the search bar to find specific movies
   - Filter by genre, language, or date

2. **Book Tickets**:
   - Click on a movie card to view details and showtimes
   - Select a convenient showtime
   - Choose your seats on the interactive seat map
   - Enter your details (or login for faster booking)
   - Confirm and complete booking

3. **View Bookings**:
   - Login to your account
   - Navigate to "My Bookings" to see all your tickets
   - Show the QR code at the cinema

### For Cinema Admins

1. **Login**:
   - Login with Cinema Admin credentials

2. **Manage Movies**:
   - Navigate to Admin Dashboard
   - Add new movies with complete details
   - Update or delete existing movies

3. **Schedule Showtimes**:
   - Click "Add Showtime" on any movie
   - Select date (within next 7 days)
   - Set time, price, and available seats
   - Showtimes are automatically available for booking

## 🔗 API Integration

The frontend connects to the following backend endpoints:

### User Service (`/api/users`)
- `POST /users` - Register new user
- `GET /users` - Get all users (admin)
- `GET /users/{id}` - Get user by ID
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

### Movie Service (`/api/admin/movies`)
- `POST /admin/movies` - Create movie
- `GET /admin/movies` - Get all movies
- `GET /admin/movies/{id}` - Get movie by ID
- `GET /admin/movies/cinema/{cinemaId}` - Get movies by cinema
- `PUT /admin/movies/{id}` - Update movie
- `DELETE /admin/movies/{id}` - Delete movie

### Showtime Service (`/api/showtimes`)
- `POST /showtimes` - Create showtime
- `GET /showtimes` - Get all showtimes
- `GET /showtimes/{id}` - Get showtime by ID
- `GET /showtimes/movie/{movieId}` - Get showtimes by movie
- `PUT /showtimes/{id}/reduce?count=N` - Reduce available seats
- `DELETE /showtimes/{id}` - Delete showtime

### Booking Service (`/api/bookings`)
- `POST /bookings` - Create booking
- `GET /bookings` - Get all bookings (admin)
- `GET /bookings/{id}` - Get booking by ID
- `GET /bookings/user/{userId}` - Get user's bookings
- `DELETE /bookings/{id}` - Cancel booking

## 🎨 Key Features

### 7-Day Booking Window
- Showtimes can only be created for the next 7 days
- Date validation enforced on both frontend and backend
- Past dates automatically filtered out

### Seat Selection
- Interactive 6x6 seat grid (36 seats total)
- Real-time seat availability
- Keyboard accessible (Tab, Enter, Space)
- Visual indicators for available/selected/booked seats
- Maximum 10 seats per booking

### Booking Flow
1. User selects showtime from movie details
2. Chooses seats from available options
3. System verifies seat availability
4. Reduces seat count atomically
5. Creates booking record
6. Generates confirmation with QR code

### Error Handling
- Race condition protection for seat booking
- Automatic refresh on booking conflicts
- User-friendly error messages
- Network error recovery with retry logic

## 🔧 Configuration

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:9090/api
```

### Constants

Edit `src/utils/constants.ts` to customize:
- `MAX_SEATS_PER_BOOKING` - Maximum seats per booking (default: 10)
- `MAX_ADVANCE_BOOKING_DAYS` - Booking window in days (default: 7)
- `SEAT_ROWS` / `SEAT_COLS` - Seat grid dimensions (default: 6x6)
- `GENRES` - Available movie genres
- `LANGUAGES` - Available languages
- `RATINGS` - Movie rating options

## 🎯 Testing the Application

### Sample Workflow

1. **Create a User** (via Register page):
   ```json
   {
     "username": "johndoe",
     "email": "john@example.com",
     "password": "password123",
     "fullName": "John Doe",
     "phoneNumber": "+1234567890"
   }
   ```

2. **Create an Admin User** (via backend/Postman):
   ```json
   {
     "username": "admin",
     "email": "admin@cinema.com",
     "password": "admin123",
     "fullName": "Cinema Admin",
     "phoneNumber": "+1234567890",
     "userType": "CINEMA_ADMIN"
   }
   ```

3. **Login as Admin** and create a movie:
   - Navigate to `/admin/movies`
   - Click "Add New Movie"
   - Fill in all required fields
   - Add cast members (comma-separated)

4. **Create Showtimes**:
   - Click "Add Showtime" on a movie
   - Select date within next 7 days
   - Set time (24-hour format: HH:mm)
   - Set price and available seats

5. **Book Tickets** as a customer:
   - Browse movies on home page or `/movies`
   - Click on a movie to view details
   - Select a showtime
   - Choose seats on the seat selector
   - Enter booking details
   - Complete booking

## 🐛 Troubleshooting

### Backend Connection Issues

Ensure all backend services are running:
- **Eureka Server**: `http://localhost:8761`
- **API Gateway**: `http://localhost:9090`
- **User Service**: `http://localhost:8081`
- **Movie Service**: `http://localhost:8082`
- **Showtime Service**: `http://localhost:8083`
- **Booking Service**: `http://localhost:8084`

### CORS Errors

- Ensure API Gateway has CORS enabled
- Check `VITE_API_BASE_URL` is correctly set in `.env`
- Verify backend CORS configuration allows `http://localhost:5173`

### Booking Failures

- Verify MongoDB is running
- Check showtime has available seats
- Ensure date is within 7-day window
- Confirm user ID is valid

### Development Server Issues

```bash
# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Clear Vite cache
Remove-Item -Recurse -Force node_modules/.vite
npm run dev
```

## 📦 Build and Deployment

### Production Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deployment Options

**1. Static Hosting (Vercel, Netlify, GitHub Pages)**:
```bash
npm run build
# Deploy dist/ folder
```

**2. Docker**:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t movie-booking-frontend .
docker run -p 80:80 movie-booking-frontend
```

**3. Preview Locally**:
```bash
npm run preview
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Movie browsing and filtering
- [ ] Showtime selection
- [ ] Seat selection (availability check)
- [ ] Booking creation and confirmation
- [ ] Admin movie CRUD operations
- [ ] Admin showtime creation
- [ ] User booking history
- [ ] Responsive design on mobile
- [ ] Dark theme appearance

### Integration Testing

Ensure backend is running, then test:
1. API connectivity
2. Authentication flow
3. Booking race conditions
4. Error handling

## 🚀 Performance Optimization

- **Code Splitting**: Routes are lazy-loaded
- **API Caching**: React Query caches server data
- **Image Optimization**: Use optimized poster URLs
- **Bundle Size**: Vite tree-shaking removes unused code

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Built with **React** and **Vite**
- Styled with **Tailwind CSS**
- Icons from **Lucide React**
- Backend powered by **Spring Boot microservices**

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review backend service logs
- Verify MongoDB connection
- Check browser console for errors

---

**Happy Movie Booking! 🎬🍿**
