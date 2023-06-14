package com.pi.digitalbooking.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.entities.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Booking {
    private String code;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private AppUser user;
    private Product product;
}
