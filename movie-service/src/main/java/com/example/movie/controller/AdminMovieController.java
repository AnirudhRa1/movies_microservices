package com.example.movie.controller;

import com.example.movie.dto.MovieDTO;
import com.example.movie.model.Showtime;
import com.example.movie.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/movies")
public class AdminMovieController {

    @Autowired
    private MovieService movieService;

    @PostMapping
    public ResponseEntity<MovieDTO> createMovie(@Valid @RequestBody MovieDTO movieDTO) {
        MovieDTO createdMovie = movieService.createMovie(movieDTO);
        return new ResponseEntity<>(createdMovie, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MovieDTO> updateMovie(@PathVariable String id, @Valid @RequestBody MovieDTO movieDTO) {
        MovieDTO updatedMovie = movieService.updateMovie(id, movieDTO);
        return ResponseEntity.ok(updatedMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable String id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{movieId}/showtimes")
    public ResponseEntity<MovieDTO> addShowtimeToMovie(
            @PathVariable String movieId,
            @Valid @RequestBody Showtime showtime) {
        com.example.movie.model.Movie movie = movieService.addShowtimeToMovie(movieId, showtime);
        return ResponseEntity.ok(convertToDTO(movie));
    }

    @DeleteMapping("/{movieId}/showtimes/{showtimeId}")
    public ResponseEntity<MovieDTO> removeShowtimeFromMovie(
            @PathVariable String movieId,
            @PathVariable String showtimeId) {
        com.example.movie.model.Movie movie = movieService.removeShowtimeFromMovie(movieId, showtimeId);
        return ResponseEntity.ok(convertToDTO(movie));
    }

    @GetMapping("/{movieId}/showtimes")
    public ResponseEntity<List<Showtime>> getMovieShowtimes(@PathVariable String movieId) {
        List<Showtime> showtimes = movieService.getMovieShowtimes(movieId);
        return ResponseEntity.ok(showtimes);
    }

    private MovieDTO convertToDTO(com.example.movie.model.Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getCinemaId(),
                movie.getTitle(),
                movie.getDirector(),
                movie.getGenre(),
                movie.getLanguage(),
                movie.getRating(),
                movie.getDuration(),
                movie.getDescription(),
                movie.getReleaseDate(),
                movie.getCast(),
                movie.getPosterUrl(),
                movie.getTrailerUrl(),
                movie.getShowtimes()
        );
    }
}
