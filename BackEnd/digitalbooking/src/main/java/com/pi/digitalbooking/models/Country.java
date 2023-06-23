package com.pi.digitalbooking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pi.digitalbooking.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer countryId;

    @Column(length = 250)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Status status;
}
