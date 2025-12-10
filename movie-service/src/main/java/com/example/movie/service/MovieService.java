package com.example.movie.service;

import com.example.movie.dto.MovieDTO;
import com.example.movie.exception.ResourceNotFoundException;
import com.example.movie.model.Movie;
import com.example.movie.model.Showtime;
import com.example.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public MovieDTO createMovie(MovieDTO movieDTO) {
        // Note: The 7-day constraint is handled at the Showtime level
        // Movies themselves don't have dates, only showtimes do
        Movie movie = convertToEntity(movieDTO);
        Movie savedMovie = movieRepository.save(movie);
        return convertToDTO(savedMovie);
    }

    public List<MovieDTO> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> searchMovies(String query) {
        return movieRepository.findByTitleContainingIgnoreCase(query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<MovieDTO> getMoviesByCinemaId(String cinemaId) {
        return movieRepository.findByCinemaId(cinemaId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO getMovieById(String id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
        return convertToDTO(movie);
    }

    public MovieDTO updateMovie(String id, MovieDTO movieDTO) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
        
        movie.setCinemaId(movieDTO.getCinemaId());
        movie.setTitle(movieDTO.getTitle());
        movie.setDirector(movieDTO.getDirector());
        movie.setGenre(movieDTO.getGenre());
        movie.setLanguage(movieDTO.getLanguage());
        movie.setRating(movieDTO.getRating());
        movie.setDuration(movieDTO.getDuration());
        movie.setDescription(movieDTO.getDescription());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setCast(movieDTO.getCast());
        movie.setPosterUrl(movieDTO.getPosterUrl());
        movie.setTrailerUrl(movieDTO.getTrailerUrl());
        
        Movie updatedMovie = movieRepository.save(movie);
        return convertToDTO(updatedMovie);
    }

    public void deleteMovie(String id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
        movieRepository.delete(movie);
    }

    public Movie addShowtimeToMovie(String movieId, Showtime showtime) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + movieId));
        
        if (movie.getShowtimes() == null) {
            movie.setShowtimes(new java.util.ArrayList<>());
        }
        
        // Check if showtime with same id doesn't already exist
        if (showtime.getId() != null && movie.getShowtimes().stream().anyMatch(s -> s.getId().equals(showtime.getId()))) {
            return movie;
        }
        
        movie.addShowtime(showtime);
        movieRepository.save(movie);
        
        return movie;
    }

    public Movie removeShowtimeFromMovie(String movieId, String showtimeId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + movieId));
        
        if (movie.getShowtimes() != null) {
            movie.removeShowtime(showtimeId);
            movieRepository.save(movie);
        }
        
        return movie;
    }

    public List<Showtime> getMovieShowtimes(String movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + movieId));
        
        return movie.getShowtimes() != null ? movie.getShowtimes() : new java.util.ArrayList<>();
    }

    private MovieDTO convertToDTO(Movie movie) {
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

    private Movie convertToEntity(MovieDTO movieDTO) {
        return new Movie(
                movieDTO.getId(),
                movieDTO.getCinemaId(),
                movieDTO.getTitle(),
                movieDTO.getDirector(),
                movieDTO.getDescription(),
                movieDTO.getGenre(),
                movieDTO.getLanguage(),
                movieDTO.getRating(),
                movieDTO.getDuration(),
                movieDTO.getReleaseDate(),
                movieDTO.getCast(),
                movieDTO.getPosterUrl(),
                movieDTO.getTrailerUrl()
        );
    }
}
