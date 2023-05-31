package com.pi.digitalbooking.repository;

import com.pi.digitalbooking.enums.CategoryStatus;
import com.pi.digitalbooking.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByNameAndStatus(String name, CategoryStatus status);

    List<Category> findAllByStatus(CategoryStatus status);

    List<Category> getByCategoryId(int id);
}
