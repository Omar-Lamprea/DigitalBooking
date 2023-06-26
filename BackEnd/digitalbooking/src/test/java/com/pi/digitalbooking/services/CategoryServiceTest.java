package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.Category;
import com.pi.digitalbooking.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryService categoryService;


    private Category category;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        category = Category.builder().categoryId(1)
                .imageUrl("imageurl.png").name("categoria master")
                .description("El mejor producto")
                .status(Status.ACTIVE).build();
    }

    @Test
    public void testSearchAll() {

        List<Category> expectedCategories = Arrays.asList(category);
        when(categoryRepository.findAll()).thenReturn(expectedCategories);

        List<Category> actualCategories = categoryService.SearchAll();
        assertEquals(expectedCategories, actualCategories);
    }

    @Test
    public void testSearchById_ExistingCategory() {
        // Arrange
        Integer categoryId = 1;
        Category expectedCategory = category;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(expectedCategory));
        Category actualCategory = categoryService.SearchById(categoryId);
        assertEquals(expectedCategory, actualCategory);
    }

    @Test
    public void testSearchById_NonExistingCategory() {

        Integer categoryId = 1;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        Category actualCategory = categoryService.SearchById(categoryId);
        assertNull(actualCategory);
    }

    @Test
    public void testDeleteById_ExistingCategory() {

        Integer categoryId = 1;
        Category expectedCategory = category;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(expectedCategory));
        categoryService.DeleteById(categoryId);
        assertEquals(Status.DELETED, expectedCategory.getStatus());
        Mockito.verify(categoryRepository, Mockito.times(1)).save(expectedCategory);
    }

    @Test
    public void testDeleteById_NonExistingCategory() {

        Integer categoryId = 1;
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        categoryService.DeleteById(categoryId);
        Mockito.verify(categoryRepository, Mockito.times(0)).save(any(Category.class));
    }

    @Test
    public void testSaveCategory() {

        Category categoryToSave = category;
        when(categoryRepository.save(categoryToSave)).thenReturn(categoryToSave);
        Category savedCategory = categoryService.SaveCategory(categoryToSave);
        assertEquals(categoryToSave, savedCategory);
    }

    @Test
    public void testIsCategoryDuplicatedByName_DuplicatedCategoryExists() {

        String categoryName = "Category 1";
        Category existingCategory = category;
        when(categoryRepository.findByNameAndStatus(categoryName, Status.ACTIVE)).thenReturn(existingCategory);
        boolean isDuplicated = categoryService.isCategoryDuplicatedByName(categoryName);
        assertTrue(isDuplicated);
    }
}