package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByNameAndStatus(String name, ProductStatus status);
    List<Product> findAllByStatus(ProductStatus status);
    Product findByCodeProductAndStatus(Integer codeProduct, ProductStatus status);
    List<Product> findByCategoryCategoryId (int id);
    List<Product> findByCityStartingWith(String city);
    List<Product> findByCityAndStatus(City city, ProductStatus status);
}
