package com.pi.digitalbooking.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.entities.ProductImageEntity;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer productId;

    @Column(nullable = false)
    @NotNull
    private Integer codeProduct;
    @Column(length = 250)
    private String name;

    @Column(length = 5000)
    private String description;

    @OneToMany(mappedBy="product")
    private List<ProductImageEntity> images;

    @Column
    private Integer score;

    @Column
    private Double price;

    @Column(length = 1000)
    private String locationUrl;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "city_id")
    private City city;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Amenity> amenities; // Lista de objetos para indicar las comodidades

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "politic_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Politic politic; // Lista de objetos para indicar las comodidades

    @Override
    public String toString() {
        return name;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;
}
