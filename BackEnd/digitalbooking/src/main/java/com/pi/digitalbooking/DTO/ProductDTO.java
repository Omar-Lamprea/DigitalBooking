package com.pi.digitalbooking.DTO;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Category;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private Integer codeProduct;

    private String name;

    private String description;

    private String imageUrl;

    private Integer score;

    private Double price;

    private String locationUrl;

    private String country;

    private String city;

    private String category;

    //private Category category;
}
