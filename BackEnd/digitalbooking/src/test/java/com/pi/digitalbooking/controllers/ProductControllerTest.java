package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.ProductDTO;
import com.pi.digitalbooking.entities.ProductImageEntity;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.exceptions.ProductNotFoundException;
import com.pi.digitalbooking.models.*;
import com.pi.digitalbooking.repository.AmenityRepository;
import com.pi.digitalbooking.services.CategoryService;
import com.pi.digitalbooking.services.ProductImageService;
import com.pi.digitalbooking.services.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {



        @Mock
        private ProductService productService;

        @Mock
        private ProductImageService productImageService;

        @Mock
        private AmenityRepository amenityRepository;

        @Mock
        private CategoryService categoryService;

        @Mock
        ObjectMapper objectMapper = new ObjectMapper();

        @InjectMocks
        private ProductController productController;

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

            Category category = Category.builder().categoryId(1)
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
        void testGetByPathVariable() throws ProductNotFoundException {
            int productId = 1;
            when(productService.searchById(productId)).thenReturn(new Product());
            Product result = productController.getByPathVariable(productId);
            assertNotNull(result);
            verify(productService, times(1)).searchById(productId);
        }

        @Test
        void testGetByPathVariable_ProductNotFoundException() {

            int productId = 1;
            when(productService.searchById(productId)).thenReturn(null);
            assertThrows(ProductNotFoundException.class, () -> {
                productController.getByPathVariable(productId);
            });
            verify(productService, times(1)).searchById(productId);
        }


        @Test
        void testGetByRequestParam() {

            int productId = 1;
            when(productService.searchById(productId)).thenReturn(new Product());
            Product result = productController.getByRequestParam(productId);
            assertNotNull(result);
            verify(productService, times(1)).searchById(productId);
        }

        @Test
        void testGetByRequestParam_ProductNotFoundException() {

            int productId = 1;
            when(productService.searchById(productId)).thenReturn(null);
            assertThrows(ProductNotFoundException.class, () -> {
                productController.getByRequestParam(productId);
            });

            verify(productService, times(1)).searchById(productId);
        }

        @Test
        void testDeleteByPathVariable() {

            int productId = 1;
            Product productToGet = new Product();
            productToGet.setStatus(Status.ACTIVE);
            when(productService.searchById(productId)).thenReturn(productToGet);
            assertDoesNotThrow(() -> {
                productController.deleteByPathVariable(productId);
            });
            verify(productService, times(1)).searchById(productId);
            verify(productService, times(1)).deleteById(productId);
        }

        @Test
        void testDeleteByPathVariable_ProductNotFoundException() {

            int productId = 1;
            when(productService.searchById(productId)).thenReturn(null);
            assertThrows(ProductNotFoundException.class, () -> {
                productController.deleteByPathVariable(productId);
            });
            verify(productService, times(1)).searchById(productId);
            verify(productService, never()).deleteById(productId);
        }

        @Test
        void testSearchAll() {
            List<Product> productList = Arrays.asList(product);
            when(productService.searchAllByStatus()).thenReturn(productList);
            List<Product> result = productController.searchAll();
            assertEquals(productList, result);
        }


    @Test
    public void testHasAmenitiesDuplicates_EmptyList() {
        // Arrange
        List<Amenity> amenities = new ArrayList<>();

        boolean result = productController.hasAmenitiesDuplicates(amenities);

        assertFalse(result);
    }

    @Test
    public void testHasAmenitiesDuplicates_NoDuplicates() {


        Amenity amenity = Amenity.builder().amenityId(1)
                .name("Comodidad 1").available(true).build();

        List<Amenity> amenities = Arrays.asList(amenity);

        boolean result = productController.hasAmenitiesDuplicates(amenities);

        assertFalse(result);
    }



    @Test
    public void testValidatePropertiesProduct_AllPropertiesFilled() {

        Amenity amenity = Amenity.builder().amenityId(1)
                .name("Comodidad 1").available(true).build();

        boolean result = productController.validatePropertiesProduct(productDTO);

        assertFalse(result);
    }


    @Test
    void getProductDTO() throws JsonProcessingException {

        String stringProduct = "{\"name\":\"Product Name\",\"description\":\"Product Description\"," +
                "\"price\":10.99,\"score\":4,\"locationUrl\":\"Bogota.url\",\"country\":\"Colombia\",\"city\":\"1\",\"category\":\"2\"}";

        ProductDTO productDTOLocal = ProductDTO.builder().name("Product Name")
                .description("Product Description")
                .price(10.99)
                .score(4)
                .country("Country")
                .locationUrl("Bogota.url")
                .country("Colombia")
                .city(1)
                .category(2).build();



        when(objectMapper.readValue(anyString(), eq(ProductDTO.class))).thenReturn(productDTOLocal);

        ProductDTO result = productController.getProductDTO(stringProduct);

        assertEquals(productDTOLocal, result);
    }



    @Test
    public void testFindByCategory() throws Exception {

        Integer categoryId = 1;
        List<Product> products = Arrays.asList(product);
        when(productService.getByCategory(categoryId)).thenReturn(products);
        List <Product> result = productController.findByCategory(1);
        assertEquals(products, result);
    }

    @Test
    public void testUpdateProduct() throws Exception {

        final Product updatedProduct = product;
        updatedProduct.setName("UpdatedProduct");

        when(productService.updateProduct(any(Product.class))).thenReturn(updatedProduct);

        Product result = productController.update(product);
        assertEquals(updatedProduct, result);

    }


}
