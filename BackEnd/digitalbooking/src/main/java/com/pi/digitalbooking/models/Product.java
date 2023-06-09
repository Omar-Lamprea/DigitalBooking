package com.pi.digitalbooking.models;

import javax.persistence.*;
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

    @Column
    private String country;

    @Column
    private String city;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ProductStatus status;

    @Column
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<Amenity> amenities; // Lista de objetos para indicar las comodidades

    @Override
    public String toString() {
        return name;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;
}
