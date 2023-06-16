package com.pi.digitalbooking.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "politics")
public class Politic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer politicId;

    @Column
    @OneToMany(mappedBy = "politic", cascade = CascadeType.ALL)
    private List<HomeRule> homeRules;

    @Column
    @OneToMany(mappedBy = "politic", cascade = CascadeType.ALL)
    private List<HealthAndSecurityRule> healthAndSecurityRules;

<<<<<<< HEAD
=======
    @Column(length = 1000)
>>>>>>> dev
    private String cancelationPolitic;
}
