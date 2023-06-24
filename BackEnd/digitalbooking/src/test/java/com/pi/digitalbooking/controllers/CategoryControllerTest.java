package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.DTO.CategoryDTO;
import com.pi.digitalbooking.DTO.ProductDTO;
import com.pi.digitalbooking.entities.ProductImageEntity;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.*;
import com.pi.digitalbooking.services.CategoryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import java.lang.reflect.Method;
import java.util.Arrays;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CategoryControllerTest {

    @Test
    void searchAll() {
    }

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private Category category;

    private Product product;

    private ProductDTO productDTO;

    private List<Product> productList;



    @BeforeEach
    public void setUp() {

        MockitoAnnotations.openMocks(this);

        ProductImageEntity productImageEntity = ProductImageEntity
                .builder().id(1).url("urlImage.com").build();

        Amenity amenity = Amenity.builder().amenityId(1)
                .name("comodidad 1").available(true).build();

        category = Category.builder().categoryId(1)
                .name("CategoryName").description("Categoria especial")
                .imageUrl("ImageUrl.png").build();

        Country country = Country.builder().countryId(1).name("Colombia").status(Status.ACTIVE).build();

        City city = City.builder().cityId(1).name("bogota").country(country).build();


        product = Product.builder()
                .codeProduct(12345)
                .name("Product Name")
                .description("Product Description")
                .images(Arrays.asList(productImageEntity))
                .score(5)
                .price(9.99)
                .locationUrl("https://example.com")
                .city(city)
                .status(Status.ACTIVE)
                .amenities(Arrays.asList(amenity))
                .category(category)
                .build();

        productList = Arrays.asList(product);

        productDTO = ProductDTO.builder().name("Product Name")
                .description("Product Description")
                .price(10.99)
                .score(4)
                .country("Country")
                .locationUrl("Bogota.url")
                .country("Colombia")
                .city(1)
                .category(2)
                .amenities(Arrays.asList(amenity)).build();
    }

    @Test
    public void testSearchAll() {

        List<Category> categories = Arrays.asList(category);
        when(categoryService.SearchAllByStatus()).thenReturn(categories);
        List<Category> result = categoryController.SearchAll();
        assertEquals(categories.size(), result.size());

    }

    @Test
    public void testGetCategory() throws Exception {

        CategoryController categoryController = new CategoryController();
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setName("Test Category");
        categoryDTO.setDescription("Test Description");
        String imageURL = "test-image-url";

        Method getCategoryMethod = CategoryController.class.getDeclaredMethod("GetCategory", CategoryDTO.class, String.class);
        getCategoryMethod.setAccessible(true);
        Category result = (Category) getCategoryMethod.invoke(categoryController, categoryDTO, imageURL);

        assertEquals(categoryDTO.getName(), result.getName());
        assertEquals(categoryDTO.getDescription(), result.getDescription());
        assertEquals(imageURL, result.getImageUrl());
        assertEquals(Status.ACTIVE, result.getStatus());
    }

    @Test
    public void testGetCategoryDTO() throws Exception {

        CategoryController categoryController = new CategoryController();
        String stringCategory = "{\"name\":\"Test Category\",\"description\":\"Test Description\"}";

        Method getCategoryDTOMethod = CategoryController.class.getDeclaredMethod("getCategoryDTO", String.class);
        getCategoryDTOMethod.setAccessible(true);

        CategoryDTO result = (CategoryDTO) getCategoryDTOMethod.invoke(categoryController, stringCategory);

        assertEquals("Test Category", result.getName());
        assertEquals("Test Description", result.getDescription());
    }


}