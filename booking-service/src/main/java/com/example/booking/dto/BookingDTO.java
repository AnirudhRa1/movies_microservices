package com.example.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public class BookingDTO {
    private String id;
    
    @NotBlank(message = "User ID is required")
    private String userId;
    
    @NotBlank(message = "Cinema ID is required")
    private String cinemaId;
    
    @NotBlank(message = "Movie ID is required")
    private String movieId;
    
    @NotBlank(message = "Showtime ID is required")
    private String showtimeId;
    
    @NotNull(message = "Seats booked is required")
    @Positive(message = "Seats booked must be positive")
    private Integer seatsBooked;
    
    private LocalDateTime bookingTime;

    public BookingDTO() {
    }

    public BookingDTO(String id, String userId, String cinemaId, String movieId, String showtimeId, Integer seatsBooked, LocalDateTime bookingTime) {
        this.id = id;
        this.userId = userId;
        this.cinemaId = cinemaId;
        this.movieId = movieId;
        this.showtimeId = showtimeId;
        this.seatsBooked = seatsBooked;
        this.bookingTime = bookingTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(String cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getShowtimeId() {
        return showtimeId;
    }

    public void setShowtimeId(String showtimeId) {
        this.showtimeId = showtimeId;
    }

    public Integer getSeatsBooked() {
        return seatsBooked;
    }

    public void setSeatsBooked(Integer seatsBooked) {
        this.seatsBooked = seatsBooked;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }
}
