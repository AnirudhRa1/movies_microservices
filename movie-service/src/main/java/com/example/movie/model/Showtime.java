package com.example.movie.model;

import java.time.LocalDate;
import java.time.LocalTime;

public class Showtime {
    private String id;
    private String screenNumber;
    private LocalDate showDate;
    private LocalTime startTime;
    private Double price;
    private Integer totalSeats;
    private Integer availableSeats;

    public Showtime() {
    }

    public Showtime(String id, String screenNumber, LocalDate showDate, LocalTime startTime, 
                    Double price, Integer totalSeats, Integer availableSeats) {
        this.id = id;
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
