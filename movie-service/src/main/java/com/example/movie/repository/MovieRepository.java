package com.example.movie.repository;

import com.example.movie.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends MongoRepository<Movie, String> {
    List<Movie> findByCinemaId(String cinemaId);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
