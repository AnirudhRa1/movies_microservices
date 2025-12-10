package com.example.showtime.repository;

import com.example.showtime.model.Showtime;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowtimeRepository extends MongoRepository<Showtime, String> {
    List<Showtime> findByMovieId(String movieId);
    List<Showtime> findByCinemaId(String cinemaId);
}
