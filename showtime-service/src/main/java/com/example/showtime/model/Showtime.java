package com.example.showtime.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "showtimes")
public class Showtime {
    @Id
    private String id;
    private String movieId;
    private String cinemaId;
    private String screenNumber;
    private LocalDate showDate;
    private LocalTime startTime;
    private Double price;
    private Integer totalSeats;
    private Integer availableSeats;

    public Showtime() {
    }

    public Showtime(String id, String movieId, String cinemaId, String screenNumber, LocalDate showDate, LocalTime startTime, Double price, Integer totalSeats, Integer availableSeats) {
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

    public LocalDate getShowDate() {
        return showDate;
    }

    public void setShowDate(LocalDate showDate) {
        this.showDate = showDate;
    }

    public String getScreenNumber() {
        return screenNumber;
    }

    public void setScreenNumber(String screenNumber) {
        this.screenNumber = screenNumber;
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
