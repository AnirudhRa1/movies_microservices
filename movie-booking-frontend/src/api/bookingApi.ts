import axiosClient from './axiosClient';
import type { Booking, BookingDTO } from '../types';

/**
 * Booking Service API
 * Base URL: /api/bookings
 */

// Create new booking
export const createBooking = async (bookingData: BookingDTO): Promise<Booking> => {
  const response = await axiosClient.post('/bookings', bookingData);
  return response.data;
};

// Get all bookings (Admin only)
export const getAllBookings = async (): Promise<Booking[]> => {
  const response = await axiosClient.get('/bookings');
  return response.data;
};

// Get booking by ID
export const getBookingById = async (bookingId: string): Promise<Booking> => {
  const response = await axiosClient.get(`/bookings/${bookingId}`);
  return response.data;
};

// Get bookings by user ID
export const getBookingsByUser = async (userId: string): Promise<Booking[]> => {
  const response = await axiosClient.get(`/bookings/user/${userId}`);
  return response.data;
};

// Cancel booking (delete)
export const cancelBooking = async (bookingId: string): Promise<void> => {
  await axiosClient.delete(`/bookings/${bookingId}`);
};
