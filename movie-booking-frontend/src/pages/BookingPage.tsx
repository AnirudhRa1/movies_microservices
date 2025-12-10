import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reduceSeats } from '../api/showtimeApi';
import { getMovieById } from '../api/movieApi';
import { createBooking } from '../api/bookingApi';
import { createUser } from '../api/userApi';
import { useAppStore } from '../store';
import type { Showtime, Movie } from '../types';
import SeatSelector from '../components/SeatSelector';
import Loading from '../components/Loading';
import { formatPrice } from '../utils/helpers';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const navigate = useNavigate();
  const { currentUser, selectedSeats, addSelectedSeat, removeSelectedSeat, clearSelectedSeats } = useAppStore();

  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]);

  useEffect(() => {
    loadMovieDetails();
    clearSelectedSeats();
  }, [movieId, showtimeId]);

  const loadMovieDetails = async () => {
    try {
      const movieData = await getMovieById(movieId!);
      setMovie(movieData);

      // Find the specific showtime in the movie's showtimes array
      const foundShowtime = movieData.showtimes?.find(s => s.id === showtimeId);
      if (foundShowtime) {
        setShowtime(foundShowtime);

        // Calculate booked seats
        const totalSeatsCount = foundShowtime.totalSeats;
        const availableSeatsCount = foundShowtime.availableSeats;
        const bookedCount = totalSeatsCount - availableSeatsCount;

        // Simulate booked seats (in production, this would come from backend)
        const booked = Array.from({ length: bookedCount }, (_, i) => i + 1);
        setBookedSeats(booked);
      } else {
        console.error('Showtime not found in movie');
      }
    } catch (error) {
      console.error('Failed to load movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      removeSelectedSeat(seatNumber);
    } else {
      addSelectedSeat(seatNumber);
    }
  };

  const validationSchema = Yup.object({
    userId: Yup.string().when([], {
      is: () => !currentUser,
      then: (schema) => schema.required('User ID is required'),
    }),
    userEmail: Yup.string().when([], {
      is: () => !currentUser,
      then: (schema) => schema.email('Invalid email').required('Email is required'),
    }),
    userName: Yup.string().when([], {
      is: () => !currentUser,
      then: (schema) => schema.required('Name is required'),
    }),
    userPhone: Yup.string().when([], {
      is: () => !currentUser,
      then: (schema) => schema.required('Phone number is required'),
    }),
  });

  const handleBooking = async (values: any) => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Re-check availability
      const latestShowtime = await getShowtimeById(showtimeId!);
      if (latestShowtime.availableSeats < selectedSeats.length) {
        alert('Not enough seats available. Please refresh and try again.');
        window.location.reload();
        return;
      }

      let userId = currentUser?.id;

      // Register guest user if not logged in
      if (!userId) {
        try {
          const newUser = await createUser({
            username: values.userEmail, // Use email as username
            email: values.userEmail,
            password: 'Password@123', // Default password for guest
            name: values.userName,
            phone: values.userPhone,
            userType: 'CUSTOMER'
          });
          userId = newUser.id;
        } catch (regError: any) {
          console.error('Registration failed:', regError);
          // If user already exists, we might want to try to find them or error out
          // For now, alert the user
          throw new Error('Registration failed. ' + (regError.response?.data?.message || ''));
        }
      }

      // Step 2: Reduce seats
      await reduceSeats(showtimeId!, selectedSeats.length);

      // Step 3: Create booking
      const bookingData = {
        userId: userId!,
        showtimeId: showtimeId!,
        seats: selectedSeats.map(String),
        totalPrice: showtime!.price * selectedSeats.length,
        status: 'CONFIRMED'
      };

      const booking = await createBooking(bookingData);

      // Navigate to success page
      navigate(`/booking/success/${booking.id}`);
    } catch (error: any) {
      console.error('Booking failed:', error);
      alert(error.message || error.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading showtime details..." />
      </div>
    );
  }

  if (!showtime || !movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">Showtime not found</p>
      </div>
    );
  }

  const totalPrice = showtime.price * selectedSeats.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Book Tickets</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Seat Selection */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Select Seats</h2>
            <SeatSelector
              totalSeats={showtime.totalSeats}
              bookedSeats={bookedSeats}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 sticky top-20">
            <h2 className="text-2xl font-bold text-white mb-4">Booking Summary</h2>

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <p className="text-gray-400 text-sm">{movie.language} • {movie.rating}</p>
              </div>

              <div className="text-sm text-gray-400 space-y-1">
                <p>Date: {new Date(showtime.showDateTime).toLocaleDateString()}</p>
                <p>Time: {new Date(showtime.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p>Screen: {showtime.screenNumber}</p>
              </div>

              {selectedSeats.length > 0 && (
                <>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-sm text-gray-400">Seats: {selectedSeats.join(', ')}</p>
                    <p className="text-sm text-gray-400">Quantity: {selectedSeats.length}</p>
                    <p className="text-sm text-gray-400">Price per seat: {formatPrice(showtime.price)}</p>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-white">Total</span>
                      <span className="text-2xl font-bold text-primary-500">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Details Form */}
            <Formik
              initialValues={{
                userId: currentUser?.id || '',
                userName: currentUser?.name || '',
                userEmail: currentUser?.email || '',
                userPhone: currentUser?.phone || '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleBooking}
            >
              {() => (
                <Form className="space-y-4">
                  {!currentUser && (
                    <>
                      <div>
                        <label className="label">Full Name</label>
                        <Field name="userName" type="text" className="input" placeholder="John Doe" />
                        <ErrorMessage name="userName" component="div" className="error-text" />
                      </div>

                      <div>
                        <label className="label">Email</label>
                        <Field name="userEmail" type="email" className="input" placeholder="john@example.com" />
                        <ErrorMessage name="userEmail" component="div" className="error-text" />
                      </div>

                      <div>
                        <label className="label">Phone Number</label>
                        <Field name="userPhone" type="tel" className="input" placeholder="+1234567890" />
                        <ErrorMessage name="userPhone" component="div" className="error-text" />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={selectedSeats.length === 0 || submitting}
                  >
                    {submitting ? 'Processing...' : `Confirm Booking (${formatPrice(totalPrice)})`}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
