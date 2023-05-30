package com.pi.digitalbooking.models;


import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idCategory;

    @Column(length = 250)
    private String name;

    @Column(length = 5000)
    private String description;

    @Column(length = 500)
    private String imageUrl;
}
