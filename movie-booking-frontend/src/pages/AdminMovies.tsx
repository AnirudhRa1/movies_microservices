import { useState, useEffect } from 'react';
import { createMovie, deleteMovie, getMoviesByCinema } from '../api/movieApi';
import { getAllCinemas } from '../api/cinemaApi';
import { createShowtimeForMovie, removeShowtimeFromMovie } from '../api/showtimeApi';
import type { Movie, Cinema } from '../types';
import { Plus, Trash2, Calendar, MapPin, Film, X } from 'lucide-react';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GENRES, LANGUAGES, RATINGS } from '../utils/constants';
import { getMinDate, getMaxDate } from '../utils/helpers';

const movieValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  genre: Yup.string().required('Genre is required'),
  duration: Yup.number().min(1).required('Duration is required'),
  language: Yup.string().required('Language is required'),
  releaseDate: Yup.string().required('Release date is required'),
  director: Yup.string().required('Director is required'),
  rating: Yup.string().required('Rating is required'),
  posterUrl: Yup.string().url().required('Poster URL is required'),
  trailerUrl: Yup.string().url().required('Trailer URL is required'),
  cast: Yup.string().required('Cast is required (comma separated)'),
});

const showtimeValidationSchema = Yup.object({
  screenNumber: Yup.string().required('Screen number is required'),
  showDate: Yup.string().required('Show date is required'),
  showTime: Yup.string().required('Show time is required'),
  price: Yup.number().min(0).required('Price is required'),
  totalSeats: Yup.number().min(1).required('Total seats is required'),
});

const AdminMovies = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [showShowtimeModal, setShowShowtimeModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    loadCinemas();
  }, []);

  useEffect(() => {
    if (selectedCinema) {
      loadMovies(selectedCinema.id);
    } else {
      setMovies([]);
    }
  }, [selectedCinema]);

  const loadCinemas = async () => {
    try {
      const data = await getAllCinemas();
      setCinemas(data);
    } catch (error) {
      console.error('Failed to load cinemas:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMovies = async (cinemaId: string) => {
    setLoading(true);
    try {
      const data = await getMoviesByCinema(cinemaId);
      setMovies(data);
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMovie = async (values: any, { setSubmitting, resetForm }: any) => {
    if (!selectedCinema) return;
    
    try {
      const movieData = {
        ...values,
        cinemaId: selectedCinema.id,
        cast: values.cast.split(',').map((c: string) => c.trim()),
      };
      console.log('Submitting movie data:', movieData);
      await createMovie(movieData);
      console.log('Movie created successfully');
      resetForm();
      setShowMovieModal(false);
      await loadMovies(selectedCinema.id);
    } catch (error: any) {
      console.error('Failed to create movie:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to create movie';
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMovie = async (movieId: string) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie(movieId);
        if (selectedCinema) {
          loadMovies(selectedCinema.id);
        }
      } catch (error) {
        alert('Failed to delete movie');
      }
    }
  };

  const handleCreateShowtime = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      console.log('Creating showtime with values:', values);
      
      await createShowtimeForMovie(selectedMovie!.id, {
        screenNumber: values.screenNumber,
        showDate: values.showDate,
        startTime: values.showTime,
        price: Number(values.price),
        totalSeats: Number(values.totalSeats),
        availableSeats: Number(values.totalSeats),
      });
      console.log('Showtime created successfully');
      resetForm();
      setShowShowtimeModal(false);
      if (selectedCinema) {
        await loadMovies(selectedCinema.id);
      }
      setSelectedMovie(null);
      alert('Showtime added successfully!');
    } catch (error: any) {
      console.error('Failed to create showtime:', error);
      alert(error.response?.data?.message || 'Failed to add showtime');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteShowtime = async (movieId: string, showtimeId: string) => {
    if (window.confirm('Are you sure you want to delete this showtime?')) {
      try {
        await removeShowtimeFromMovie(movieId, showtimeId);
        if (selectedCinema) {
          await loadMovies(selectedCinema.id);
        }
        alert('Showtime deleted successfully!');
      } catch (error: any) {
        console.error('Failed to delete showtime:', error);
        alert(error.response?.data?.message || 'Failed to delete showtime');
      }
    }
  };

  if (loading && !selectedCinema && cinemas.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          {selectedCinema ? `Movies at ${selectedCinema.name}` : 'Select a Cinema'}
        </h1>
        {selectedCinema && (
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedCinema(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Back to Cinemas
            </button>
            <button
              onClick={() => setShowMovieModal(true)}
              className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Movie
            </button>
          </div>
        )}
      </div>

      {!selectedCinema ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cinemas.map((cinema) => (
            <div
              key={cinema.id}
              onClick={() => setSelectedCinema(cinema)}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition border border-gray-700 hover:border-primary-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary-900/50 p-3 rounded-full">
                  <Film className="w-8 h-8 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{cinema.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{cinema.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex gap-4 p-4 border-b border-gray-700">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{movie.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {movie.genre} • {movie.duration} min • {movie.rating} • {movie.director}
                      </p>
                      <p className="text-gray-400 text-sm">{movie.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedMovie(movie);
                      setShowShowtimeModal(true);
                    }}
                    className="flex items-center gap-1 text-sm bg-primary-600/20 text-primary-400 px-3 py-1 rounded hover:bg-primary-600/30 transition mt-3"
                  >
                    <Plus className="w-4 h-4" />
                    Add Showtime
                  </button>
                </div>
              </div>

              {/* Showtimes List */}
              <div className="p-4">
                {movie.showtimes && movie.showtimes.length > 0 ? (
                  <div>
                    <h4 className="text-white font-semibold mb-3">Showtimes ({movie.showtimes.length})</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {movie.showtimes.map((showtime: any) => (
                        <div key={showtime.id} className="bg-gray-700 p-3 rounded border border-gray-600">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-white font-semibold">{showtime.startTime}</p>
                              <p className="text-gray-400 text-sm">{showtime.showDate}</p>
                              <p className="text-gray-400 text-sm">Screen {showtime.screenNumber}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteShowtime(movie.id, showtime.id)}
                              className="text-red-400 hover:text-red-300 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            <p>Price: ₹{showtime.price}</p>
                            <p>Seats: {showtime.availableSeats}/{showtime.totalSeats} available</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic">No showtimes added yet. Click "Add Showtime" to create one.</p>
                )}
              </div>
            </div>
          ))}
          
          {movies.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No movies found for this cinema. Add one to get started!
            </div>
          )}
        </div>
      )}

      {/* Add Movie Modal */}
      <Modal
        isOpen={showMovieModal}
        onClose={() => setShowMovieModal(false)}
        title={`Add New Movie to ${selectedCinema?.name}`}
        size="lg"
      >
        <Formik
          initialValues={{
            title: '',
            description: '',
            genre: '',
            duration: '',
            language: '',
            releaseDate: '',
            director: '',
            rating: '',
            posterUrl: '',
            trailerUrl: '',
            cast: '',
          }}
          validationSchema={movieValidationSchema}
          onSubmit={handleCreateMovie}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Title</label>
                  <Field name="title" className="input" />
                  <ErrorMessage name="title" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Director</label>
                  <Field name="director" className="input" />
                  <ErrorMessage name="director" component="div" className="error" />
                </div>
              </div>

              <div>
                <label className="label">Description</label>
                <Field name="description" as="textarea" className="input" rows={3} />
                <ErrorMessage name="description" component="div" className="error" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label">Genre</label>
                  <Field as="select" name="genre" className="input">
                    <option value="">Select</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="genre" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Language</label>
                  <Field as="select" name="language" className="input">
                    <option value="">Select</option>
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="language" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Rating</label>
                  <Field as="select" name="rating" className="input">
                    <option value="">Select</option>
                    {RATINGS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="rating" component="div" className="error" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Duration (minutes)</label>
                  <Field name="duration" type="number" className="input" />
                  <ErrorMessage name="duration" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Release Date</label>
                  <Field name="releaseDate" type="date" className="input" />
                  <ErrorMessage name="releaseDate" component="div" className="error" />
                </div>
              </div>

              <div>
                <label className="label">Cast (comma-separated)</label>
                <Field name="cast" className="input" placeholder="Actor 1, Actor 2, Actor 3" />
                <ErrorMessage name="cast" component="div" className="error" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Poster URL</label>
                  <Field name="posterUrl" className="input" />
                  <ErrorMessage name="posterUrl" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Trailer URL</label>
                  <Field name="trailerUrl" className="input" />
                  <ErrorMessage name="trailerUrl" component="div" className="error" />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowMovieModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Adding...' : 'Add Movie'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>

      {/* Add Showtime Modal */}
      <Modal
        isOpen={showShowtimeModal}
        onClose={() => setShowShowtimeModal(false)}
        title={`Add Showtime for ${selectedMovie?.title}`}
      >
        <Formik
          initialValues={{
            screenNumber: '',
            showDate: '',
            showTime: '',
            price: '',
            totalSeats: '',
          }}
          validationSchema={showtimeValidationSchema}
          onSubmit={handleCreateShowtime}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Screen Number</label>
                  <Field name="screenNumber" type="number" className="input" />
                  <ErrorMessage name="screenNumber" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Price ($)</label>
                  <Field name="price" type="number" className="input" />
                  <ErrorMessage name="price" component="div" className="error" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Date</label>
                  <Field 
                    name="showDate" 
                    type="date" 
                    className="input"
                    min={getMinDate()}
                    max={getMaxDate()}
                  />
                  <ErrorMessage name="showDate" component="div" className="error" />
                </div>
                <div>
                  <label className="label">Time</label>
                  <Field name="showTime" type="time" className="input" />
                  <ErrorMessage name="showTime" component="div" className="error" />
                </div>
              </div>

              <div>
                <label className="label">Total Seats</label>
                <Field name="totalSeats" type="number" className="input" />
                <ErrorMessage name="totalSeats" component="div" className="error" />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowShowtimeModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                >
                  {isSubmitting ? 'Adding...' : 'Add Showtime'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AdminMovies;
