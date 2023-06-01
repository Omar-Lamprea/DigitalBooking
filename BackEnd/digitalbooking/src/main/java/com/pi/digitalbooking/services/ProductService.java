package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.CategoryRepository;
import com.pi.digitalbooking.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> SearchAll() {
        return productRepository.findAll();
    }

    public List<Product> SearchAllByStatus() {
        return productRepository.findAllByStatus(ProductStatus.ACTIVE);
    }

    public Product SearchById(Integer id) {

        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            return product.get();
        } else {
            return null;
        }
    }

    public boolean isProductDuplicatedByName(String productName) {
        Product existingProduct = productRepository.findByNameAndStatus(productName, ProductStatus.ACTIVE);
        return existingProduct != null;
    }

    public boolean isProductDuplicatedByCodeProduct(Integer codeProduct) {
        Product existingProduct = productRepository.findByCodeProductAndStatus(codeProduct, ProductStatus.ACTIVE);
        return existingProduct != null;
    }

    public void DeleteById(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setStatus(ProductStatus.DELETED);
            productRepository.save(product);
        }
    }

    public Product UpdateProduct(Product product) {

        Optional<Product> product1 = productRepository.findById(product.getProductId());

        if (product1.isPresent()) {
            return productRepository.save(product);
        } else {
            log.error("No existe producto con id: " + product.getProductId());
            return null;
        }
    }

    public Product SaveProduct(Product product) {

        Product productToSave = productRepository.save(product);
        log.info("Producto " + productToSave.toString() + " guardado con exito.");
        return productToSave;
    }


    public List<Product> getByCategory(int id) {

        return productRepository.findByCategoryCategoryId(id).stream()
                .filter(product -> product.getStatus()
                        .equals(ProductStatus.ACTIVE)).collect(Collectors.toList());

    }
}
