package com.example.showtime.service;

import com.example.showtime.dto.ShowtimeDTO;
import com.example.showtime.exception.InvalidDateException;
import com.example.showtime.exception.ResourceNotFoundException;
import com.example.showtime.exception.InsufficientSeatsException;
import com.example.showtime.model.Showtime;
import com.example.showtime.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowtimeService {

    @Autowired
    private ShowtimeRepository showtimeRepository;

    private static final int MAX_DAYS_AHEAD = 7;

    public ShowtimeDTO createShowtime(ShowtimeDTO showtimeDTO) {
        validateShowDate(showtimeDTO.getShowDate());
        
        Showtime showtime = convertToEntity(showtimeDTO);
        Showtime savedShowtime = showtimeRepository.save(showtime);
        return convertToDTO(savedShowtime);
    }

    public List<ShowtimeDTO> getShowtimesByMovieId(String movieId) {
        return showtimeRepository.findByMovieId(movieId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ShowtimeDTO> getShowtimesByCinemaId(String cinemaId) {
        return showtimeRepository.findByCinemaId(cinemaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ShowtimeDTO getShowtimeById(String id) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        return convertToDTO(showtime);
    }

    public ShowtimeDTO updateShowtime(String id, ShowtimeDTO showtimeDTO) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        
        validateShowDate(showtimeDTO.getShowDate());
        
        showtime.setMovieId(showtimeDTO.getMovieId());
        showtime.setCinemaId(showtimeDTO.getCinemaId());
        showtime.setScreenNumber(showtimeDTO.getScreenNumber());
        showtime.setShowDate(showtimeDTO.getShowDate());
        showtime.setStartTime(showtimeDTO.getStartTime());
        showtime.setPrice(showtimeDTO.getPrice());
        showtime.setTotalSeats(showtimeDTO.getTotalSeats());
        showtime.setAvailableSeats(showtimeDTO.getAvailableSeats());
        
        Showtime updatedShowtime = showtimeRepository.save(showtime);
        return convertToDTO(updatedShowtime);
    }

    public void deleteShowtime(String id) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        showtimeRepository.delete(showtime);
    }

    public void reduceSeats(String id, int count) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        
        if (showtime.getAvailableSeats() < count) {
            throw new InsufficientSeatsException("Not enough seats available. Available: " + showtime.getAvailableSeats());
        }
        
        showtime.setAvailableSeats(showtime.getAvailableSeats() - count);
        showtimeRepository.save(showtime);
    }

    private void validateShowDate(LocalDate showDate) {
        LocalDate today = LocalDate.now();
        LocalDate maxDate = today.plusDays(MAX_DAYS_AHEAD);
        
        if (showDate.isBefore(today)) {
            throw new InvalidDateException("Show date cannot be in the past");
        }
        
        if (showDate.isAfter(maxDate)) {
            throw new InvalidDateException("Show date must be within the next " + MAX_DAYS_AHEAD + " days");
        }
    }

    private ShowtimeDTO convertToDTO(Showtime showtime) {
        return new ShowtimeDTO(
                showtime.getId(),
                showtime.getMovieId(),
                showtime.getCinemaId(),
                showtime.getScreenNumber(),
                showtime.getShowDate(),
                showtime.getStartTime(),
                showtime.getPrice(),
                showtime.getTotalSeats(),
                showtime.getAvailableSeats()
        );
    }

    private Showtime convertToEntity(ShowtimeDTO showtimeDTO) {
        return new Showtime(
                showtimeDTO.getId(),
                showtimeDTO.getMovieId(),
                showtimeDTO.getCinemaId(),
                showtimeDTO.getScreenNumber(),
                showtimeDTO.getShowDate(),
                showtimeDTO.getStartTime(),
                showtimeDTO.getPrice(),
                showtimeDTO.getTotalSeats(),
                showtimeDTO.getAvailableSeats()
        );
    }
}
