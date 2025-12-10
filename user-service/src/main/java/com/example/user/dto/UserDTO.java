package com.example.user.dto;

import com.example.user.model.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserDTO {
    private String id;
    
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    
    @NotBlank(message = "Phone is required")
    private String phone;
    
    @NotNull(message = "User type is required")
    private UserType userType;
    
    private String cinemaId; // Only for CINEMA_ADMIN

    public UserDTO() {
    }

    public UserDTO(String id, String name, String email, String phone, UserType userType, String cinemaId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.userType = userType;
        this.cinemaId = cinemaId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public String getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(String cinemaId) {
        this.cinemaId = cinemaId;
    }
}
