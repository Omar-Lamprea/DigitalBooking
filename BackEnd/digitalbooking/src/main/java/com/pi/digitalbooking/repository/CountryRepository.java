package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Integer> {

    Country findByNameAndStatus(String name, Status status);

    List<Country> findAllByStatus(Status status);
}
