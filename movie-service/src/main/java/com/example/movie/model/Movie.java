package com.example.movie.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "movies")
public class Movie {
    @Id
    private String id;
    private String cinemaId;
    private String title;
    private String director;
    private String description;
    private String genre;
    private String language;
    private String rating;
    private Integer duration; // in minutes
    private LocalDate releaseDate;
    private List<String> cast;
    private String posterUrl;
    private String trailerUrl;
    private List<Showtime> showtimes = new ArrayList<>(); // List of showtime objects embedded in movie - initialized by default

    public Movie() {
        this.showtimes = new ArrayList<>();
    }

    public Movie(String id, String cinemaId, String title, String director, String description, String genre, 
                 String language, String rating, Integer duration, LocalDate releaseDate, List<String> cast, 
                 String posterUrl, String trailerUrl) {
        this.id = id;
        this.cinemaId = cinemaId;
        this.title = title;
        this.director = director;
        this.description = description;
        this.genre = genre;
        this.language = language;
        this.rating = rating;
        this.duration = duration;
        this.releaseDate = releaseDate;
        this.cast = cast;
        this.posterUrl = posterUrl;
        this.trailerUrl = trailerUrl;
        this.showtimes = new ArrayList<>(); // Initialize showtimes list
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public void addShowtime(Showtime showtime) {
        if (this.showtimes == null) {
            this.showtimes = new ArrayList<>();
        }
        this.showtimes.add(showtime);
    }

    public void removeShowtime(String showtimeId) {
        if (this.showtimes != null) {
            this.showtimes.removeIf(s -> s.getId().equals(showtimeId));
        }
    }
}
