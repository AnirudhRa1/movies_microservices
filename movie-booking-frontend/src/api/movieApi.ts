import axiosClient from './axiosClient';
import type { Movie, MovieDTO } from '../types';

/**
 * Movie Service API
 * Base URL: /api/movies
 */

// Create new movie (Admin only)
export const createMovie = async (movieData: MovieDTO): Promise<Movie> => {
  const response = await axiosClient.post('/admin/movies', movieData);
  return response.data;
};

// Get all movies
export const getAllMovies = async (): Promise<Movie[]> => {
  const response = await axiosClient.get('/movies');
  return response.data;
};

// Search movies
export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axiosClient.get(`/movies/search?query=${encodeURIComponent(query)}`);
  return response.data;
};

// Get movie by ID
export const getMovieById = async (movieId: string): Promise<Movie> => {
  const response = await axiosClient.get(`/movies/${movieId}`);
  return response.data;
};

// Get movies by cinema ID
export const getMoviesByCinema = async (cinemaId: string): Promise<Movie[]> => {
  const response = await axiosClient.get(`/movies/cinema/${cinemaId}`);
  return response.data;
};

// Update movie (Admin only)
export const updateMovie = async (movieId: string, movieData: Partial<MovieDTO>): Promise<Movie> => {
  const response = await axiosClient.put(`/admin/movies/${movieId}`, movieData);
  return response.data;
};

// Delete movie (Admin only)
export const deleteMovie = async (movieId: string): Promise<void> => {
  await axiosClient.delete(`/admin/movies/${movieId}`);
};
