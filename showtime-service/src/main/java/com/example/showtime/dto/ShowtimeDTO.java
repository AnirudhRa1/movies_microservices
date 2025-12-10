package com.example.showtime.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;
import java.time.LocalTime;

public class ShowtimeDTO {
    private String id;
    
    @NotBlank(message = "Movie ID is required")
    private String movieId;
    
    @NotBlank(message = "Cinema ID is required")
    private String cinemaId;
    
    @NotBlank(message = "Screen number is required")
    private String screenNumber;
    
    @NotNull(message = "Show date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate showDate;
    
    @NotNull(message = "Start time is required")
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;
    
    @NotNull(message = "Total seats is required")
    @Positive(message = "Total seats must be positive")
    private Integer totalSeats;
    
    @NotNull(message = "Available seats is required")
    @Positive(message = "Available seats must be positive")
    private Integer availableSeats;

    public ShowtimeDTO() {
    }

    public ShowtimeDTO(String id, String movieId, String cinemaId, String screenNumber, LocalDate showDate, LocalTime startTime, Double price, Integer totalSeats, Integer availableSeats) {
        this.id = id;
        this.movieId = movieId;
        this.cinemaId = cinemaId;
        this.screenNumber = screenNumber;
        this.showDate = showDate;
        this.startTime = startTime;
        this.price = price;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(String cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getScreenNumber() {
        return screenNumber;
    }

    public void setScreenNumber(String screenNumber) {
        this.screenNumber = screenNumber;
    }

    public LocalDate getShowDate() {
        return showDate;
    }

    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getTotalSeats() {
        return totalSeats;
    }

    public void setTotalSeats(Integer totalSeats) {
        this.totalSeats = totalSeats;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
}
