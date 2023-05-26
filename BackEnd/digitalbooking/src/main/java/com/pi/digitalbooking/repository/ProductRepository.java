package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByNameAndStatus(String name, ProductStatus status);
}
