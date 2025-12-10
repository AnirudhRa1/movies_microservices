import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllMovies, searchMovies } from '../api/movieApi';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import { GENRES, LANGUAGES } from '../utils/constants';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const searchQuery = searchParams.get('search') || '';
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    filterMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, selectedGenre, selectedLanguage]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery) {
        data = await searchMovies(searchQuery);
      } else {
        data = await getAllMovies();
      }
      setMovies(data);
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = [...movies];

    // Client-side filtering for genre and language only
    if (selectedGenre) {
      filtered = filtered.filter((movie) => movie.genre === selectedGenre);
    }

    if (selectedLanguage) {
      filtered = filtered.filter((movie) => movie.language === selectedLanguage);
    }

    setFilteredMovies(filtered);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const clearFilters = () => {
    setSelectedGenre('');
    setSelectedLanguage('');
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading text="Loading movies..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">Browse Movies</h1>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="input"
            >
              <option value="">All Genres</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="input"
            >
              <option value="">All Languages</option>
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button onClick={clearFilters} className="btn-secondary w-full">
              Clear Filters
            </button>
          </div>
        </div>

        {searchQuery && (
          <div className="mt-4">
            <p className="text-gray-400">
              Search results for: <span className="text-white font-semibold">"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Movies Grid */}
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
        </p>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No movies found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Movies;
