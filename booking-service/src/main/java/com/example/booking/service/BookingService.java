package com.example.booking.service;

import com.example.booking.client.ShowtimeClient;
import com.example.booking.dto.BookingDTO;
import com.example.booking.dto.ShowtimeDTO;
import com.example.booking.exception.InvalidDateException;
import com.example.booking.exception.ResourceNotFoundException;
import com.example.booking.model.Booking;
import com.example.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowtimeClient showtimeClient;

    private static final int MAX_DAYS_AHEAD = 7;

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Step 1: Verify showtime exists
        ShowtimeDTO showtime = showtimeClient.getShowtimeById(bookingDTO.getShowtimeId());
        
        if (showtime == null) {
            throw new ResourceNotFoundException("Showtime not found with id: " + bookingDTO.getShowtimeId());
        }
        
        // Step 2: Validate showtime date is within 7 days
        validateShowDate(showtime.getShowDate());
        
        // Step 3: Verify enough seats available
        if (showtime.getAvailableSeats() < bookingDTO.getSeatsBooked()) {
            throw new InvalidDateException("Not enough seats available. Available: " + showtime.getAvailableSeats());
        }
        
        // Step 4: Reduce seats via Feign client
        showtimeClient.reduceSeats(bookingDTO.getShowtimeId(), bookingDTO.getSeatsBooked());
        
        // Step 5: Save booking
        Booking booking = convertToEntity(bookingDTO);
        booking.setBookingTime(LocalDateTime.now());
        Booking savedBooking = bookingRepository.save(booking);
        
        return convertToDTO(savedBooking);
    }

    public List<BookingDTO> getBookingsByUserId(String userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return convertToDTO(booking);
    }

    private void validateShowDate(LocalDate showDate) {
        LocalDate today = LocalDate.now();
        LocalDate maxDate = today.plusDays(MAX_DAYS_AHEAD);
        
        if (showDate.isBefore(today)) {
            throw new InvalidDateException("Cannot book for past shows");
        }
        
        if (showDate.isAfter(maxDate)) {
            throw new InvalidDateException("Can only book shows within the next " + MAX_DAYS_AHEAD + " days");
        }
    }

    private BookingDTO convertToDTO(Booking booking) {
        return new BookingDTO(
                booking.getId(),
                booking.getUserId(),
                booking.getCinemaId(),
                booking.getMovieId(),
                booking.getShowtimeId(),
                booking.getSeatsBooked(),
                booking.getBookingTime()
        );
    }

    private Booking convertToEntity(BookingDTO bookingDTO) {
        return new Booking(
                bookingDTO.getId(),
                bookingDTO.getUserId(),
                bookingDTO.getCinemaId(),
                bookingDTO.getMovieId(),
                bookingDTO.getShowtimeId(),
                bookingDTO.getSeatsBooked(),
                bookingDTO.getBookingTime()
        );
    }
}
