package com.pi.digitalbooking.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pi.digitalbooking.enums.CategoryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer categoryId;

    @Column(length = 250)
    private String name;

    @Column(length = 5000)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private CategoryStatus status;
}
