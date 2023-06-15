package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.models.HomeRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeRuleRepository extends JpaRepository<HomeRule, Integer> {

}
