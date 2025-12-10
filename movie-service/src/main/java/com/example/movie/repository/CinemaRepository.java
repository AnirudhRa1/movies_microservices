package com.example.movie.repository;

import com.example.movie.model.Cinema;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CinemaRepository extends MongoRepository<Cinema, String> {
}
