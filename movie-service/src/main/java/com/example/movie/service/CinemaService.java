package com.example.movie.service;

import com.example.movie.model.Cinema;
import com.example.movie.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CinemaService {

    @Autowired
    private CinemaRepository cinemaRepository;

    public Cinema createCinema(Cinema cinema) {
        return cinemaRepository.save(cinema);
    }

    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }
    
    public Cinema getCinemaById(String id) {
        return cinemaRepository.findById(id).orElse(null);
    }
}
