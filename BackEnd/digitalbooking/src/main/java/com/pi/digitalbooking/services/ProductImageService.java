package com.pi.digitalbooking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.entities.ProductImageEntity;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.models.ProductImage;
import com.pi.digitalbooking.repository.ProductImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductImageService {
    @Autowired
    private ProductImageRepository productImageRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    public void addImagesToProduct(Product newProduct, List<String> imagesURLs){
        List<ProductImageEntity> images = imagesURLs.stream().map(url -> new ProductImageEntity(null, url, newProduct)).toList();
        productImageRepository.saveAll(images);
    }
}
