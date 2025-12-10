import axiosClient from './axiosClient';
import type { Cinema, CinemaDTO } from '../types';

/**
 * Cinema Service API
 * Base URL: /api/admin/cinemas
 */

// Create new cinema (Admin only)
export const createCinema = async (cinemaData: CinemaDTO): Promise<Cinema> => {
  const response = await axiosClient.post('admin/cinemas', cinemaData);
  return response.data;
};

// Get all cinemas
export const getAllCinemas = async (): Promise<Cinema[]> => {
  const response = await axiosClient.get('admin/cinemas');
  return response.data;
};
