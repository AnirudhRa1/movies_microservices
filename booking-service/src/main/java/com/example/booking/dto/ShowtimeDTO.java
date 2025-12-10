package com.example.booking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
import java.time.LocalTime;

public class ShowtimeDTO {
    private String id;
    private String movieId;
    private String cinemaId;
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate showDate;
    
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    
    private Integer availableSeats;

    public ShowtimeDTO() {
    }

    public ShowtimeDTO(String id, String movieId, String cinemaId, LocalDate showDate, LocalTime startTime, Integer availableSeats) {
        this.id = id;
        this.movieId = movieId;
        this.cinemaId = cinemaId;
        this.showDate = showDate;
        this.startTime = startTime;
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

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }
}
