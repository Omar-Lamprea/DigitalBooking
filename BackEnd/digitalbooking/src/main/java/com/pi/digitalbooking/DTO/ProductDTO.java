package com.pi.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Category;
import javax.persistence.Column;

import com.pi.digitalbooking.models.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductDTO {

    private Integer codeProduct;

    private String name;

    private String description;

    private Integer score;

    private Double price;

    private String locationUrl;

    private String country;

    private String city;

    private String category;

    //private Category category;
}
