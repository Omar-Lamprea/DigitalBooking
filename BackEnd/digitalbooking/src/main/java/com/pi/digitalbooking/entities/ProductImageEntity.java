package com.pi.digitalbooking.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pi.digitalbooking.models.Product;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "product_images")
public class ProductImageEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    private String url;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="id_product", nullable = false)
    private Product product;
}
