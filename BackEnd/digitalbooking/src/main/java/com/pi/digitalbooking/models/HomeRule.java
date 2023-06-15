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
@Table(name = "homerules")
public class HomeRule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer homeRuleId;

    private String homeRuleDescription;

    @ManyToOne
    @JoinColumn(name = "politic_id")
    @JsonIgnore
    private Politic politic;

}
