package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Product findByNameAndStatus(String name, Status status);
    List<Product> findAllByStatus(Status status);
    Product findByCodeProductAndStatus(Integer codeProduct, Status status);
    List<Product> findByCategoryCategoryId (int id);
    List<Product> findByCityAndStatus(City city, Status status);

    String HAVERSINE_FORMULA = "(6371 * acos(cos(radians(:latitude)) * cos(radians(p.latitude)) *" +
            " cos(radians(p.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(p.latitude))))";

    @Query("SELECT p FROM Product p WHERE p.city.name = :city AND " + HAVERSINE_FORMULA + " < :distance " +
            "AND p.status = :status AND p NOT IN " +
            "(SELECT b.product FROM BookingEntity b WHERE b.checkInDate <= :checkOutDate " +
            "AND b.checkOutDate >= :checkInDate AND b.status = :status) ORDER BY "+ HAVERSINE_FORMULA + "ASC")
    List<Product> findActiveProductsWithoutBookingAndWithInDistanceByCity(
            @Param("latitude") double latitude,
            @Param("longitude") double longitude,
            @Param("distance") double distanceWithInKM,
            @Param("city") String cityName,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("status") Status status);

    Product getProductByCodeProductAndStatus(Integer code, Status status);
    @Query("SELECT p FROM Product p WHERE " + HAVERSINE_FORMULA + " < :distance " +
            "AND p.status = :status AND p NOT IN " +
            "(SELECT b.product FROM BookingEntity b WHERE b.checkInDate <= :checkOutDate " +
            "AND b.checkOutDate >= :checkInDate AND b.status = :status) ORDER BY "+ HAVERSINE_FORMULA + "ASC")
    List<Product> findActiveProductsWithoutBookingAndWithInDistanceByDates(
            @Param("latitude") double latitude,
            @Param("longitude") double longitude,
            @Param("distance") double distanceWithInKM,
            @Param("checkInDate") LocalDate checkInDate,
            @Param("checkOutDate") LocalDate checkOutDate,
            @Param("status") Status status);

}
