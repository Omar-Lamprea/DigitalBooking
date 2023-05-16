package com.pi.digitalbooking.DTO;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private String name;

    private String description;

    private String imageUrl;

    private Integer score;

    private Double price;

    private String locationUrl;
}
