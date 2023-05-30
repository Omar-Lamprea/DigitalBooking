package com.pi.digitalbooking.models;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idProduct;

    @Column
    private String name;

    @Column
    private String description;

    @Column(length = 250)
    private String imageUrl;

    @Column
    private Integer score;

    @Column
    private Double price;

    @Column
    private String locationUrl;

    @Column
    private String country;

    @Column
    private String city;

    @Column
    private String category;
}
