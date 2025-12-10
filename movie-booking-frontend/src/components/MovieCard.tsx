import { Link } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="card group">
      {/* Poster */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>{movie.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{movie.duration} min</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-info">{movie.genre}</span>
          <span className="badge badge-warning">{movie.language}</span>
        </div>

        <Link
          to={`/movies/${movie.id}`}
          className="btn-primary w-full text-center block"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
