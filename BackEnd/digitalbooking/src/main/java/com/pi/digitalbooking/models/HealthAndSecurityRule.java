package com.pi.digitalbooking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "healthandsecurityrules")
public class HealthAndSecurityRule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer healthAndSecurityRuleId;

    private String healthAndSecurityRuleDescription;

    @ManyToOne
    @JoinColumn(name = "politic_id")
    @JsonIgnore
    private Politic politic;
}
