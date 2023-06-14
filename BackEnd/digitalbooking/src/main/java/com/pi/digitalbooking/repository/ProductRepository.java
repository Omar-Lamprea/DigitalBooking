package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByNameAndStatus(String name, ProductStatus status);
    List<Product> findAllByStatus(ProductStatus status);
    Product findByCodeProductAndStatus(Integer codeProduct, ProductStatus status);
    List<Product> findByCategoryCategoryId (int id);
    List<Product> findByCityAndStatus(City city, ProductStatus status);

    @Query("SELECT p FROM Product p WHERE p.city.name = :city AND p.status = :status AND p NOT IN " +
            "(SELECT b.product FROM BookingEntity b WHERE b.checkInDate <= :checkOutDate " +
            "AND b.checkOutDate >= :checkInDate AND b.status = :status)")
    List<Product> findActiveProductsWithoutBooking(
            @Param("city") String cityName,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("status") ProductStatus status);

    Product getProductByCodeProductAndStatus(Integer code, ProductStatus status);
}
