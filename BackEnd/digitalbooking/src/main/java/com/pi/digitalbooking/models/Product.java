package com.pi.digitalbooking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pi.digitalbooking.enums.ProductStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idProduct;

    @Column(nullable = false)
    @NotNull
    private Integer codeProduct;
    @Column(length = 250)
    private String name;

    @Column(length = 5000)
    private String description;

    @Column(length = 500)
    private List<String> imagesURLs;

    @Column
    private Integer score;

    @Column
    private Double price;

    @Column(length = 1000)
    private String locationUrl;

    @Column
    private String country;

    @Column
    private String city;

    @Column
    private String category;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private ProductStatus status;

    @Override
    public String toString() {
        return name;
    }

    //@ManyToOne
    //@JoinColumn(name = "category_id")
    //private Category category;
}
