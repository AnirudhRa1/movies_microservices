import axiosClient from './axiosClient';
import type { Showtime, ShowtimeDTO } from '../types';

/**
 * Showtime Service API
 * Base URL: /api/admin/movies (for movie-embedded showtimes)
 */

// Create new showtime for a movie (embedded in Movie entity)
export const createShowtimeForMovie = async (movieId: string, showtimeData: Omit<ShowtimeDTO, 'movieId' | 'cinemaId'>): Promise<any> => {
  const response = await axiosClient.post(`/admin/movies/${movieId}/showtimes`, showtimeData);
  return response.data;
};

// Create new showtime (Legacy - separate service)
export const createShowtime = async (showtimeData: ShowtimeDTO): Promise<Showtime> => {
  const response = await axiosClient.post('/showtimes', showtimeData);
  return response.data;
};

// Get all showtimes for a movie
export const getShowtimesForMovie = async (movieId: string): Promise<Showtime[]> => {
  const response = await axiosClient.get(`/admin/movies/${movieId}/showtimes`);
  return response.data;
};

// Get all showtimes (legacy)
export const getAllShowtimes = async (): Promise<Showtime[]> => {
  const response = await axiosClient.get('/showtimes');
  return response.data;
};

// Get showtime by ID
export const getShowtimeById = async (showtimeId: string): Promise<Showtime> => {
  const response = await axiosClient.get(`/showtimes/${showtimeId}`);
  return response.data;
};

// Get showtimes by movie ID (legacy)
export const getShowtimesByMovie = async (movieId: string): Promise<Showtime[]> => {
  const response = await axiosClient.get(`/showtimes/movie/${movieId}`);
  return response.data;
};

// Get showtimes by cinema ID
export const getShowtimesByCinema = async (cinemaId: string): Promise<Showtime[]> => {
  const response = await axiosClient.get(`/showtimes/cinema/${cinemaId}`);
  return response.data;
};

// Update showtime (Admin only)
export const updateShowtime = async (showtimeId: string, showtimeData: Partial<ShowtimeDTO>): Promise<Showtime> => {
  const response = await axiosClient.put(`/showtimes/${showtimeId}`, showtimeData);
  return response.data;
};

// Remove showtime from movie
export const removeShowtimeFromMovie = async (movieId: string, showtimeId: string): Promise<any> => {
  const response = await axiosClient.delete(`/admin/movies/${movieId}/showtimes/${showtimeId}`);
  return response.data;
};

// Reduce seats (called before booking)
export const reduceSeats = async (showtimeId: string, count: number): Promise<Showtime> => {
  const response = await axiosClient.put(`/showtimes/${showtimeId}/reduce?count=${count}`);
  return response.data;
};

// Delete showtime (Admin only)
export const deleteShowtime = async (showtimeId: string): Promise<void> => {
  await axiosClient.delete(`/showtimes/${showtimeId}`);
};
