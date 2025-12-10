package com.example.movie.controller;

import com.example.movie.dto.MovieDTO;
import com.example.movie.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<MovieDTO>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/search")
    public ResponseEntity<List<MovieDTO>> searchMovies(@RequestParam String query) {
        return ResponseEntity.ok(movieService.searchMovies(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieDTO> getMovieById(@PathVariable String id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @GetMapping("/cinema/{cinemaId}")
    public ResponseEntity<List<MovieDTO>> getMoviesByCinemaId(@PathVariable String cinemaId) {
        List<MovieDTO> movies = movieService.getMoviesByCinemaId(cinemaId);
        return ResponseEntity.ok(movies);
    }
}
