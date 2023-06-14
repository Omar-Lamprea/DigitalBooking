package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.entities.ProductImageEntity;
import com.pi.digitalbooking.models.Category;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.services.ProductService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    private List<ProductImageEntity> productImages= Arrays.asList(ProductImageEntity.builder().id(1).url("img.url").build());
    private Category category = Category.builder().categoryId(1).name("rurales").imageUrl("image rurales").description("categoria rurales").build();
    private Product product = Product.builder().productId(1).name("habitacion1")
            .description("habitacion primer piso").images(productImages)
            .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
            .country("Colombia").category(category).build();

    private Product productUpdated = Product.builder().productId(1).name("habitacion actualizada")
            .description("habitacion primer piso").images(productImages)
            .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
            .country("Colombia").category(category).build();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        when(productService.searchById(5)).thenReturn(product);
        when(productService.saveProduct(any(Product.class))).thenReturn(product);
        when(productService.searchAll()).thenReturn(Arrays.asList(product));
        when(productService.updateProduct(any())).thenReturn(productUpdated);
    }

    @Test
    @DisplayName("Test getByPathVariable the rigth product")
    void getByPathVariable() {

        Product actualProduct = Product.builder().productId(1).name("habitacion1")
                .description("habitacion primer piso").images(productImages)
                .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
                .country("Colombia").category(category).build();

        Product productSetUp = productController.getByPathVariable(5);
        assertEquals(actualProduct,productSetUp);
    }

    @Test
    @DisplayName("Test searchById the rigth product")
    void getByRequestParam() {

        Product actualProduct = Product.builder().productId(1).name("habitacion1")
                .description("habitacion primer piso").images(productImages)
                .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
                .country("Colombia").category(category).build();

        Product expectedProduct = productService.searchById(5);
        assertEquals(expectedProduct, actualProduct);
        verify(productService, times(1)).searchById(5);
    }

    @Test
    @DisplayName("Test delete a product correctly")
    void deleteByPathVariable() {
        Product productoLocal = Product.builder().productId(3).build();
        productController.deleteByPathVariable(productoLocal.getProductId());
        verify(productService).deleteById(productoLocal.getProductId());
    }

    @Test
    @DisplayName("Test search all products")
    void searchAll() {
        List <Product> actualProducts = Arrays.asList(Product.builder().productId(1).name("habitacion1")
                .description("habitacion primer piso").images(productImages)
                .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
                .country("Colombia").category(category).build());
        List<Product> products = productController.searchAll();
        assertEquals(actualProducts,products);

    }

    @Test
    @DisplayName("Test updates a product")
    void update() {

        Product actualProduct = Product.builder().productId(1).name("habitacion actualizada")
                .description("habitacion primer piso").images(productImages)
                .price(70.000).score(5).city("Bogota").locationUrl("Bogota.url")
                .country("Colombia").category(category).build();

        Product product = new Product();
        Product productUpdatedLocal = productController.update(product);
        assertEquals(productUpdatedLocal,actualProduct);



    }

}