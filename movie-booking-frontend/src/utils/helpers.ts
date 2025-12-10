import { format, addDays, isAfter, isBefore, parse } from 'date-fns';

/**
 * Date & Time Utilities
 */

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

// Get date N days from today
export const getDateAfterDays = (days: number): string => {
  return format(addDays(new Date(), days), 'yyyy-MM-dd');
};

// Check if date is within next 7 days
export const isWithinNext7Days = (dateString: string): boolean => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  const today = new Date();
  const maxDate = addDays(today, 7);
  
  return isAfter(date, today) && isBefore(date, maxDate);
};

// Format date for display
export const formatDateForDisplay = (dateString: string): string => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  return format(date, 'MMM dd, yyyy');
};

// Format time for display (HH:mm to 12-hour format)
export const formatTimeForDisplay = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Get minimum date (today)
export const getMinDate = (): string => {
  return getTodayDate();
};

// Get maximum date (7 days from today)
export const getMaxDate = (): string => {
  return getDateAfterDays(7);
};

// Validate showtime date
export const validateShowtimeDate = (dateString: string): boolean => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = addDays(today, 7);
  
  return !isBefore(date, today) && !isAfter(date, maxDate);
};

/**
 * Price & Currency Utilities
 */

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * String Utilities
 */

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Validation Utilities
 */

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};
