import { useMemo } from 'react';
import { SEAT_COLS } from '../utils/constants';

interface SeatSelectorProps {
  totalSeats: number;
  bookedSeats: number[];
  selectedSeats: number[];
  onSeatSelect: (seatNumber: number) => void;
  maxSeats?: number;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({
  totalSeats,
  bookedSeats = [],
  selectedSeats = [],
  onSeatSelect,
  maxSeats = 10,
}) => {
  const rows = useMemo(() => Math.ceil(totalSeats / SEAT_COLS), [totalSeats]);

  const getSeatClass = (seatNumber: number): string => {
    if (bookedSeats.includes(seatNumber)) {
      return 'seat seat-booked';
    }
    if (selectedSeats.includes(seatNumber)) {
      return 'seat seat-selected';
    }
    return 'seat seat-available';
  };

  const handleSeatClick = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    if (!selectedSeats.includes(seatNumber) && selectedSeats.length >= maxSeats) {
      alert(`You can select maximum ${maxSeats} seats`);
      return;
    }

    onSeatSelect(seatNumber);
  };

  const handleKeyDown = (e: React.KeyboardEvent, seatNumber: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSeatClick(seatNumber);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-block bg-gray-700 px-16 py-2 rounded-t-3xl">
          <span className="text-gray-400 text-sm">SCREEN</span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="space-y-2">
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm w-6 text-center">
                {String.fromCharCode(65 + rowIndex)}
              </span>

              <div className="flex space-x-2">
                {Array.from({ length: SEAT_COLS }, (_, colIndex) => {
                  const seatNumber = rowIndex * SEAT_COLS + colIndex + 1;
                  if (seatNumber > totalSeats) return null;

                  return (
                    <button
                      key={seatNumber}
                      className={getSeatClass(seatNumber)}
                      onClick={() => handleSeatClick(seatNumber)}
                      onKeyDown={(e) => handleKeyDown(e, seatNumber)}
                      disabled={bookedSeats.includes(seatNumber)}
                      aria-label={`Seat ${seatNumber}`}
                      aria-pressed={selectedSeats.includes(seatNumber)}
                      role="checkbox"
                      tabIndex={0}
                    >
                      {colIndex + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="seat seat-available"></div>
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="seat seat-selected"></div>
          <span className="text-gray-400">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="seat seat-booked"></div>
          <span className="text-gray-400">Booked</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-white">
            Selected Seats: <span className="font-bold text-green-500">
              {selectedSeats.join(', ')}
            </span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default SeatSelector;
