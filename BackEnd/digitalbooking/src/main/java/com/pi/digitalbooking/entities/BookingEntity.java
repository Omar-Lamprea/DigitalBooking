package com.pi.digitalbooking.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.models.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "bookings")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String status;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
}
