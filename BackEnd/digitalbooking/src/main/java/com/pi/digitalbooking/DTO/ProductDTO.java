package com.pi.digitalbooking.DTO;

import com.pi.digitalbooking.models.Amenity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Integer codeProduct;

    private String name;

    private String description;

    private Integer score;

    private Double price;

    private String locationUrl;

    private List<Amenity> amenities;

    private String country;

    private String city;

    private Integer category;
}
