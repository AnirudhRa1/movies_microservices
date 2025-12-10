import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, Star, User as UserIcon } from 'lucide-react';
import { getMovieById } from '../api/movieApi';
import type { Movie, Showtime } from '../types';
import Loading from '../components/Loading';
import ShowtimeCard from '../components/ShowtimeCard';
import { formatDateForDisplay } from '../utils/helpers';

const MovieDetails = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movieId) {
      loadMovieDetails();
    }
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      const data = await getMovieById(movieId!);
      setMovie(data);
    } catch (error) {
      console.error('Failed to load movie:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url: string): string => {
    if (!url) return '';
    
    // Handle youtube.com/watch?v=ID format
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }
    
    // Handle youtu.be/ID format
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    
    // Handle youtube.com/embed/ID format (already in embed format)
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return '';
  };

  // Group showtimes by date from movie object
  const showtimesByDate = (movie?.showtimes || []).reduce((acc, showtime) => {
    const date = showtime.showDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading movie details..." />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400 text-lg">Movie not found</p>
        <Link to="/movies" className="btn-primary inline-block mt-4">
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=No+Image';
                }}
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="badge badge-info">{movie.genre}</span>
                <span className="badge badge-warning">{movie.language}</span>
                <span className="badge badge-success">{movie.rating}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-5 h-5" />
                  <span>{movie.duration} min</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDateForDisplay(movie.releaseDate)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{movie.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <UserIcon className="w-5 h-5 text-primary-500" />
                  <h3 className="text-xl font-semibold text-white">Director</h3>
                </div>
                <p className="text-gray-300">{movie.director}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor, index) => (
                    <span key={index} className="badge badge-info">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div className="lg:col-span-2">
              {movie.trailerUrl ? (
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl h-full flex flex-col">
                  <div className="aspect-video flex-shrink-0">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYouTubeEmbedUrl(movie.trailerUrl)}
                      title={`${movie.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-4 bg-gray-800 flex-grow flex items-center">
                    <p className="text-white font-semibold">Watch Trailer</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-lg p-8 text-center h-full flex items-center justify-center">
                  <p className="text-gray-400">No trailer available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Available Showtimes</h2>

        {Object.keys(showtimesByDate).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(showtimesByDate).map(([date, dateShowtimes]) => (
              <div key={date}>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {formatDateForDisplay(date)}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dateShowtimes.map((showtime) => (
                    <ShowtimeCard 
                      key={showtime.id} 
                      showtime={showtime} 
                      movieId={movie?.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400 text-lg">
              No showtimes available for this movie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
