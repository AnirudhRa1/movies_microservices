package com.example.booking.client;

import com.example.booking.dto.ShowtimeDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "showtime-service", path = "/api/showtimes")
public interface ShowtimeClient {
    
    @GetMapping("/{id}")
    ShowtimeDTO getShowtimeById(@PathVariable String id);
    
    @PutMapping("/{id}/reduce")
    void reduceSeats(@PathVariable String id, @RequestParam int count);
}
