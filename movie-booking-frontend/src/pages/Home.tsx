import { Link } from 'react-router-dom';
import { Search, Film, Ticket } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllMovies } from '../api/movieApi';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const data = await getAllMovies();
      setMovies(data.slice(0, 6)); // Show only first 6 movies
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/movies?search=${searchQuery}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Film className="w-20 h-20 text-primary-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Book Your Movie Tickets
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Experience cinema like never before. Book tickets in seconds.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, genres, or languages..."
                className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-l-lg focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Film className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Latest Movies</h3>
            <p className="text-gray-400">Browse the newest releases and upcoming films</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Easy Booking</h3>
            <p className="text-gray-400">Select your seats and book in just a few clicks</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Quick Search</h3>
            <p className="text-gray-400">Find movies by genre, language, or cinema</p>
          </div>
        </div>

        {/* Now Showing */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Now Showing</h2>
            <Link to="/movies" className="text-primary-500 hover:text-primary-400">
              View All →
            </Link>
          </div>

          {loading ? (
            <Loading text="Loading movies..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {!loading && movies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No movies available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
