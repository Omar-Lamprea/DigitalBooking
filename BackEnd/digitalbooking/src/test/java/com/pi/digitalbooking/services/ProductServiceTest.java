package com.pi.digitalbooking.services;

import com.pi.digitalbooking.entities.ProductImageEntity;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.*;
import com.pi.digitalbooking.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;


    @InjectMocks
    private Product product;

    @InjectMocks
    private ProductService productService;

    @InjectMocks
    private City city;




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
    }


    @Test
    void testSearchAll() {

        List<Product> productList = Arrays.asList(product);

        when(productRepository.findAll()).thenReturn(productList);

        List<Product> result = productService.searchAll();

        assertEquals(productList, result);

    }


    @Test
    void testSearchById_ExistingProduct() {

        MockitoAnnotations.openMocks(this);
        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        Product result = productService.searchById(1);
        assertEquals(product, result);

    }
    @Test
    void testIsProductDuplicatedByName_WhenExistingProductFound() {

        when(productRepository.findByNameAndStatus(product.getName(), Status.ACTIVE))
                .thenReturn(product);

        boolean isDuplicated = productService.isProductDuplicatedByName(product.getName());

        assertTrue(isDuplicated);
        verify(productRepository, times(1))
                .findByNameAndStatus(product.getName(), Status.ACTIVE);
    }

    @Test
    void testIsProductDuplicatedByCodeProductWhenExistingProductFound() {



        when(productRepository.findByCodeProductAndStatus(1, Status.ACTIVE))
                .thenReturn(product);

        boolean isDuplicated = productService.isProductDuplicatedByCodeProduct(1);

        assertTrue(isDuplicated);
        verify(productRepository, times(1))
                .findByCodeProductAndStatus(1, Status.ACTIVE);
    }

    @Test
    void testDeleteByIdWhenProductExists() {


        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        productService.deleteById(1);
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).save(product);
        assertEquals(Status.DELETED, product.getStatus());
    }


    @Test
    void testSaveProduct() {

        when(productRepository.save(product)).thenReturn(product);


        Product savedProduct = productService.saveProduct(product);

        // Assert
        verify(productRepository, times(1)).save(product);
        assertEquals(product, savedProduct);
    }

    @Test
    void testGetByCategory() {

        List<Product> products = Arrays.asList(product);
        when(productRepository.findByCategoryCategoryId(1)).thenReturn(products);

        List<Product> activeProducts = productService.getByCategory(1);

        verify(productRepository, times(1)).findByCategoryCategoryId(1);
        assertEquals(1, activeProducts.size());
        List<Product> expectedProducts = products.stream()
                .filter(product -> product.getStatus().equals(Status.ACTIVE))
                .collect(Collectors.toList());
        assertEquals(expectedProducts, activeProducts);
    }
}