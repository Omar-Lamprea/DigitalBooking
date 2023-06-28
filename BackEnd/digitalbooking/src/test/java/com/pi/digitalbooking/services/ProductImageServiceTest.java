package com.pi.digitalbooking.services;


import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.ProductImageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

class ProductImageServiceTest {

    @Mock
    private ProductImageRepository productImageRepository;


    @InjectMocks
    private ProductImageService productImageService;


    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddImagesToProduct2() {

        Product newProduct = new Product();
        List<String> imagesURLs = Arrays.asList("url1", "url2", "url3");

        productImageService.addImagesToProduct(newProduct, imagesURLs);

        verify(productImageRepository, times(1)).saveAll(anyList());
    }
}







