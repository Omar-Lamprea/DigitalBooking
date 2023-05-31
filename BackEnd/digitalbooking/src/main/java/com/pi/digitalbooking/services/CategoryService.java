package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.CategoryStatus;
import com.pi.digitalbooking.models.Category;
import com.pi.digitalbooking.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> SearchAll() {
        return categoryRepository.findAll();
    }

    public Category SearchById(Integer id) {

        Optional<Category> category = categoryRepository.findById(id);

        if (category.isPresent()) {
            return category.get();
        } else {
            return null;
        }
    }

    public void DeleteById(Integer categoryId) {

        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category != null) {
            category.setStatus(CategoryStatus.DELETED);
            categoryRepository.save(category);
        }
    }

    public Category SaveCategory(Category category) {

        Category categoryToSave = categoryRepository.save(category);
        log.info("Categoria " + categoryToSave.toString() + " guardada con exito.");
        return categoryToSave;
    }

    public boolean isCategoryDuplicatedByName(String categoryName) {
        Category existingCategory = categoryRepository.findByNameAndStatus(categoryName, CategoryStatus.ACTIVE);
        return existingCategory != null;
    }

    public List<Category> SearchAllByStatus() {
        return categoryRepository.findAllByStatus(CategoryStatus.ACTIVE);
    }

    public List<Category> getCategoryById(int id){
        return categoryRepository.getByCategoryId(id);
    }



}