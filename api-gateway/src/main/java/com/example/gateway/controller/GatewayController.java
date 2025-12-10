package com.example.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GatewayController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "🎬 Movie Ticket Booking System - API Gateway");
        response.put("status", "Running");
        response.put("version", "1.0.0");
        
        Map<String, String> endpoints = new HashMap<>();
        endpoints.put("User Service", "http://localhost:9090/api/users");
        endpoints.put("Movie Service", "http://localhost:9090/api/admin/movies/{cinemaId}");
        endpoints.put("Showtime Service", "http://localhost:9090/api/showtimes");
        endpoints.put("Booking Service", "http://localhost:9090/api/bookings");
        endpoints.put("Eureka Dashboard", "http://localhost:8761");
        
        response.put("endpoints", endpoints);
        response.put("documentation", "Check README.md for API usage");
        
        return response;
    }
}
