package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.CityStatus;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    City findByNameAndStatus(String name, CityStatus status);

    List<City> findAllByStatus(CityStatus status);

    List<City> findByCountry(Country country);
}
