import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookingById } from '../api/bookingApi';
import { getShowtimeById } from '../api/showtimeApi';
import { getMovieById } from '../api/movieApi';
import type { Booking, Showtime, Movie } from '../types';
import { CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatPrice } from '../utils/helpers';
import Loading from '../components/Loading';

const BookingSuccess = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookingDetails();
  }, [bookingId]);

  const loadBookingDetails = async () => {
    try {
      const bookingData = await getBookingById(bookingId!);
      setBooking(bookingData);

      const showtimeData = await getShowtimeById(bookingData.showtimeId);
      setShowtime(showtimeData);

      const movieData = await getMovieById(showtimeData.movieId);
      setMovie(movieData);
    } catch (error) {
      console.error('Failed to load booking:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading booking details..." />
      </div>
    );
  }

  if (!booking || !showtime || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">Booking not found</p>
        <Link to="/" className="btn-primary inline-block mt-4">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-gray-400">Your tickets have been booked successfully</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-800 rounded-lg p-8">
          <div className="text-center mb-6">
            <QRCodeSVG value={booking.id} size={200} className="mx-auto" />
            <p className="text-sm text-gray-400 mt-2">Booking ID: {booking.id}</p>
          </div>

          <div className="border-t border-gray-700 pt-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{movie.title}</h2>
              <p className="text-gray-400">{movie.language} • {movie.rating}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Date</p>
                <p className="text-white font-semibold">{new Date(showtime.showDateTime).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Time</p>
                <p className="text-white font-semibold">{new Date(showtime.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div>
                <p className="text-gray-400">Screen</p>
                <p className="text-white font-semibold">{showtime.screenNumber}</p>
              </div>
              <div>
                <p className="text-gray-400">Seats</p>
                <p className="text-white font-semibold">{booking.seats.join(', ')}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total Paid</span>
                <span className="text-2xl font-bold text-green-500">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-300 text-center">
              Please show this QR code at the cinema counter to collect your tickets
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <Link to="/" className="btn-primary flex-1 text-center">
              Book More Tickets
            </Link>
            <button onClick={() => window.print()} className="btn-secondary flex-1">
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
