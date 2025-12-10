/**
 * Application Constants
 */

// Booking constraints
export const MAX_SEATS_PER_BOOKING = 10;
export const MAX_ADVANCE_BOOKING_DAYS = 7;

// Seat grid configuration
export const SEAT_ROWS = 6;
export const SEAT_COLS = 6;
export const TOTAL_SEATS = SEAT_ROWS * SEAT_COLS;

// User types
export const USER_TYPES = {
  CUSTOMER: 'CUSTOMER',
  CINEMA_ADMIN: 'CINEMA_ADMIN',
} as const;

// Movie genres
export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Western',
];

// Movie ratings
export const RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

// Languages
export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Hindi',
  'Chinese',
  'Japanese',
  'Korean',
];

// API endpoints (for reference)
export const API_ENDPOINTS = {
  USERS: '/users',
  MOVIES: '/admin/movies',
  SHOWTIMES: '/showtimes',
  BOOKINGS: '/bookings',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  CURRENT_USER: 'currentUser',
  SELECTED_CINEMA: 'selectedCinema',
} as const;
