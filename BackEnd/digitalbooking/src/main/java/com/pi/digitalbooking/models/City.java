package com.pi.digitalbooking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pi.digitalbooking.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer cityId;

    @Column(length = 250)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "country_id")
    private Country country;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Status status;
}
