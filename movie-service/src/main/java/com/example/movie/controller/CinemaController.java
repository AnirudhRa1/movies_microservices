package com.example.movie.controller;

import com.example.movie.model.Cinema;
import com.example.movie.service.CinemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/cinemas")
public class CinemaController {

    @Autowired
    private CinemaService cinemaService;

    @PostMapping
    public ResponseEntity<Cinema> createCinema(@RequestBody Cinema cinema) {
        Cinema createdCinema = cinemaService.createCinema(cinema);
        return new ResponseEntity<>(createdCinema, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Cinema>> getAllCinemas() {
        return ResponseEntity.ok(cinemaService.getAllCinemas());
    }
}
