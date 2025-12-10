import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getBookingsByUser } from '../api/bookingApi';
import { getShowtimeById } from '../api/showtimeApi';
import { getMovieById } from '../api/movieApi';
import type { Booking } from '../types';
import Loading from '../components/Loading';
import { Calendar, Clock, Ticket } from 'lucide-react';
import { formatPrice } from '../utils/helpers';

interface BookingWithDetails extends Booking {
  movieTitle?: string;
  showDateTime?: string;
}

const UserBookings = () => {
  const { userId } = useParams<{ userId: string }>();
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [userId]);

  const loadBookings = async () => {
    try {
      const bookingData = await getBookingsByUser(userId!);

      // Fetch additional details for each booking
      const bookingsWithDetails = await Promise.all(
        bookingData.map(async (booking) => {
          try {
            const showtime = await getShowtimeById(booking.showtimeId);
            const movie = await getMovieById(showtime.movieId);
            return {
              ...booking,
              movieTitle: movie.title,
              showDateTime: showtime.showDateTime,
            };
          } catch {
            return booking;
          }
        })
      );

      setBookings(bookingsWithDetails);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading your bookings..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Ticket className="w-8 h-8 text-primary-500" />
                <span className="badge badge-success">{booking.status || 'Confirmed'}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {booking.movieTitle || 'Movie'}
              </h3>

              <div className="space-y-2 text-sm text-gray-400">
                {booking.showDateTime && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(booking.showDateTime).toLocaleDateString()}</span>
                  </div>
                )}
                {booking.showDateTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(booking.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Ticket className="w-4 h-4" />
                  <span>{booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''} ({booking.seats.join(', ')})</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Paid</span>
                  <span className="text-xl font-bold text-primary-500">
                    {formatPrice(booking.totalPrice)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Booking ID: {booking.id}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No bookings yet</p>
          <p className="text-gray-500 mt-2">Book your first movie ticket to see it here!</p>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
