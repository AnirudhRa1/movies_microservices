package com.example.showtime.exception;

public class InsufficientSeatsException extends RuntimeException {
    public InsufficientSeatsException(String message) {
        super(message);
    }
}
