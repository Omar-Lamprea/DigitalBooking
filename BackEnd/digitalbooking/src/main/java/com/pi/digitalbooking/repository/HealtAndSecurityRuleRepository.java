package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.models.HealthAndSecurityRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealtAndSecurityRuleRepository extends JpaRepository<HealthAndSecurityRule, Integer> {
}
