// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  phone: string;
  userType: 'CUSTOMER' | 'CINEMA_ADMIN';
}

export interface UserDTO {
  username: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  userType: 'CUSTOMER' | 'CINEMA_ADMIN';
}

// Movie Types
export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  language: string;
  releaseDate: string;
  director: string;
  cast: string[];
  rating: string;
  posterUrl: string;
  trailerUrl: string;
  cinemaId: string;
  showtimes: Showtime[];
}

export interface MovieDTO {
  title: string;
  description: string;
  genre: string;
  duration: number;
  language: string;
  releaseDate: string;
  director: string;
  cast: string[];
  rating: string;
  posterUrl: string;
  trailerUrl: string;
  cinemaId: string;
}

export interface Cinema {
  id: string;
  name: string;
  location: string;
}

export interface CinemaDTO {
  name: string;
  location: string;
}

// Showtime Types
export interface Showtime {
  id: string;
  screenNumber: string;
  showDate: string;
  startTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

export interface ShowtimeDTO {
  movieId: string;
  cinemaId: string;
  screenNumber: string;
  showDate: string;
  startTime: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
  bookingDate: string;
  status: string;
}

export interface BookingDTO {
  userId: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
  status: string;
  bookingDate?: string;
}

// API Response Types
export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
