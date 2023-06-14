package com.pi.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingCreateDto {
    private String code;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    private AppUserDto user;
    private ProductDTO product;
}
