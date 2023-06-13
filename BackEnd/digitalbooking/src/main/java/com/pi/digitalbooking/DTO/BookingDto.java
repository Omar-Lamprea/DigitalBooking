package com.pi.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.entities.AppUser;
import com.pi.digitalbooking.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingDto {
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private AppUser user;
    private Product product;
}
