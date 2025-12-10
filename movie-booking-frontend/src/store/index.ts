import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Showtime } from '../types';

/**
 * Application Store using Zustand
 * Manages global state for authentication, booking flow, and filters
 */

interface AppState {
  // Authentication
  currentUser: User | null;
  sessionToken: string | null;
  
  // Booking Flow
  selectedShowtime: Showtime | null;
  selectedSeats: number[];
  selectedCinema: string | null;
  
  // Search & Filters
  searchFilters: {
    genre: string | null;
    language: string | null;
    date: string | null;
    cinemaId: string | null;
  };
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  setSessionToken: (token: string | null) => void;
  setSelectedShowtime: (showtime: Showtime | null) => void;
  setSelectedSeats: (seats: number[]) => void;
  addSelectedSeat: (seat: number) => void;
  removeSelectedSeat: (seat: number) => void;
  clearSelectedSeats: () => void;
  setSelectedCinema: (cinemaId: string | null) => void;
  setSearchFilters: (filters: Partial<AppState['searchFilters']>) => void;
  clearSearchFilters: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial State
      currentUser: null,
      sessionToken: null,
      selectedShowtime: null,
      selectedSeats: [],
      selectedCinema: null,
      searchFilters: {
        genre: null,
        language: null,
        date: null,
        cinemaId: null,
      },
      
      // Authentication Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      setSessionToken: (token) => set({ sessionToken: token }),
      
      // Booking Flow Actions
      setSelectedShowtime: (showtime) => set({ selectedShowtime: showtime }),
      setSelectedSeats: (seats) => set({ selectedSeats: seats }),
      addSelectedSeat: (seat) => set((state) => ({
        selectedSeats: [...state.selectedSeats, seat],
      })),
      removeSelectedSeat: (seat) => set((state) => ({
        selectedSeats: state.selectedSeats.filter((s) => s !== seat),
      })),
      clearSelectedSeats: () => set({ selectedSeats: [] }),
      setSelectedCinema: (cinemaId) => set({ selectedCinema: cinemaId }),
      
      // Filter Actions
      setSearchFilters: (filters) => set((state) => ({
        searchFilters: { ...state.searchFilters, ...filters },
      })),
      clearSearchFilters: () => set({
        searchFilters: {
          genre: null,
          language: null,
          date: null,
          cinemaId: null,
        },
      }),
      
      // Logout
      logout: () => set({
        currentUser: null,
        sessionToken: null,
        selectedShowtime: null,
        selectedSeats: [],
      }),
    }),
    {
      name: 'movie-booking-store',
      partialize: (state) => ({
        currentUser: state.currentUser,
        sessionToken: state.sessionToken,
        selectedCinema: state.selectedCinema,
      }),
    }
  )
);
