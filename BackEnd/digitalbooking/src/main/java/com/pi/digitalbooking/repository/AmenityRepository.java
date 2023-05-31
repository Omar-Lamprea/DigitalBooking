package com.pi.digitalbooking.repository;


import com.pi.digitalbooking.models.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityRepository extends JpaRepository<Amenity, Integer> {
}
