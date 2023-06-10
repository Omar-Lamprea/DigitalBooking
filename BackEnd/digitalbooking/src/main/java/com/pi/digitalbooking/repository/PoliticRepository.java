package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.models.Politic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoliticRepository extends JpaRepository<Politic, Integer> {
}
