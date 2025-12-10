package com.example.movie.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import com.example.movie.model.Showtime;
import java.time.LocalDate;
import java.util.List;

public class MovieDTO {
    private String id;
    
    @NotBlank(message = "Cinema ID is required")
    private String cinemaId;
    
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Director is required")
    private String director;
    
    @NotBlank(message = "Genre is required")
    private String genre;

    @NotBlank(message = "Language is required")
    private String language;

    @NotBlank(message = "Rating is required")
    private String rating;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer duration;
    
    private String description;

    private LocalDate releaseDate;
    
    private List<String> cast;
    
    private String posterUrl;
    
    private String trailerUrl;
    
    private List<Showtime> showtimes;

    public MovieDTO() {
    }

    public MovieDTO(String id, String cinemaId, String title, String director, String genre, String language, 
                    String rating, Integer duration, String description, LocalDate releaseDate, List<String> cast, 
                    String posterUrl, String trailerUrl, List<Showtime> showtimes) {
        this.id = id;
        this.cinemaId = cinemaId;
        this.title = title;
        this.director = director;
        this.genre = genre;
        this.language = language;
        this.rating = rating;
        this.duration = duration;
        this.description = description;
        this.releaseDate = releaseDate;
        this.cast = cast;
        this.posterUrl = posterUrl;
        this.trailerUrl = trailerUrl;
        this.showtimes = showtimes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(String cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public List<String> getCast() {
        return cast;
    }

    public void setCast(List<String> cast) {
        this.cast = cast;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public List<Showtime> getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(List<Showtime> showtimes) {
        this.showtimes = showtimes;
    }
}
