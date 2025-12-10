import axiosClient from './axiosClient';
import type { User, UserDTO } from '../types';

/**
 * User Service API
 * Base URL: /api/users
 */

// Create new user (Register)
export const createUser = async (userData: UserDTO): Promise<User> => {
  const response = await axiosClient.post('/users', userData);
  return response.data;
};

// Get all users (Admin only)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get('/users');
  return response.data;
};

// Get user by ID
export const getUserById = async (userId: string): Promise<User> => {
  const response = await axiosClient.get(`/users/${userId}`);
  return response.data;
};

// Update user
export const updateUser = async (userId: string, userData: Partial<UserDTO>): Promise<User> => {
  const response = await axiosClient.put(`/users/${userId}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (userId: string): Promise<void> => {
  await axiosClient.delete(`/users/${userId}`);
};

// Login helper - finds user by email (demo only, no real authentication)
export const loginUser = async (email: string, _password: string): Promise<User> => {
  try {
    console.log('Attempting login for:', email);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    
    // Fetch all users and find by email
    const users = await getAllUsers();
    console.log('Fetched users:', users.length);
    
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('User not found. Please check your email or register.');
    }
    
    // In a real app, password would be verified on backend
    // For demo purposes, we accept any password if user exists
    console.log('Login successful:', user);
    return user;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Login failed');
  }
};
