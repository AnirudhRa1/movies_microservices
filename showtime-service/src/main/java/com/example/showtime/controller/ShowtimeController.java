package com.example.showtime.controller;

import com.example.showtime.dto.ShowtimeDTO;
import com.example.showtime.service.ShowtimeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
public class ShowtimeController {

    @Autowired
    private ShowtimeService showtimeService;

    @PostMapping
    public ResponseEntity<ShowtimeDTO> createShowtime(@Valid @RequestBody ShowtimeDTO showtimeDTO) {
        ShowtimeDTO createdShowtime = showtimeService.createShowtime(showtimeDTO);
        return new ResponseEntity<>(createdShowtime, HttpStatus.CREATED);
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<ShowtimeDTO>> getShowtimesByMovieId(@PathVariable String movieId) {
        List<ShowtimeDTO> showtimes = showtimeService.getShowtimesByMovieId(movieId);
        return ResponseEntity.ok(showtimes);
    }

    @GetMapping("/cinema/{cinemaId}")
    public ResponseEntity<List<ShowtimeDTO>> getShowtimesByCinemaId(@PathVariable String cinemaId) {
        List<ShowtimeDTO> showtimes = showtimeService.getShowtimesByCinemaId(cinemaId);
        return ResponseEntity.ok(showtimes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShowtimeDTO> getShowtimeById(@PathVariable String id) {
        ShowtimeDTO showtime = showtimeService.getShowtimeById(id);
        return ResponseEntity.ok(showtime);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShowtimeDTO> updateShowtime(@PathVariable String id, @Valid @RequestBody ShowtimeDTO showtimeDTO) {
        ShowtimeDTO updatedShowtime = showtimeService.updateShowtime(id, showtimeDTO);
        return ResponseEntity.ok(updatedShowtime);
    }

    @PutMapping("/{id}/reduce")
    public ResponseEntity<Void> reduceSeats(@PathVariable String id, @RequestParam int count) {
        showtimeService.reduceSeats(id, count);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShowtime(@PathVariable String id) {
        showtimeService.deleteShowtime(id);
        return ResponseEntity.noContent().build();
    }
}
