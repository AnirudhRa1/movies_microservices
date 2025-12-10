import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { Showtime } from '../types';
import { formatPrice, formatDateForDisplay } from '../utils/helpers';

interface ShowtimeCardProps {
  showtime: Showtime;
  movieTitle?: string;
  movieId?: string;
}

const ShowtimeCard: React.FC<ShowtimeCardProps> = ({ showtime, movieTitle, movieId }) => {
  const availabilityPercentage = (showtime.availableSeats / showtime.totalSeats) * 100;

  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return 'text-green-500';
    if (availabilityPercentage > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const bookingUrl = movieId ? `/booking/${movieId}/${showtime.id}` : `/book/${showtime.id}`;

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition">
      {movieTitle && (
        <h4 className="text-white font-semibold mb-2">{movieTitle}</h4>
      )}

      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div className="flex items-center space-x-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{formatDateForDisplay(showtime.showDate)}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{showtime.startTime}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span>Screen {showtime.screenNumber}</span>
        </div>
        <div className="text-right">
          <span className="text-primary-500 font-semibold">
            {formatPrice(showtime.price)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-400">
          Available: <span className={`font-semibold ${getAvailabilityColor()}`}>
            {showtime.availableSeats}/{showtime.totalSeats}
          </span>
        </span>
      </div>

      <Link
        to={bookingUrl}
        className={`btn-primary w-full text-center block ${showtime.availableSeats === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        onClick={(e) => {
          if (showtime.availableSeats === 0) {
            e.preventDefault();
            alert('No seats available for this showtime');
          }
        }}
      >
        {showtime.availableSeats > 0 ? 'Select Seats' : 'Sold Out'}
      </Link>
    </div>
  );
};

export default ShowtimeCard;
