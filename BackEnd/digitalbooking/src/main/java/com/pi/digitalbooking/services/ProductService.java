package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> SearchAll() {
        return productRepository.findAll();
    }

    public Product SearchById(Integer id) {

        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            return product.get();
        } else {
            return null;
        }
    }

    public boolean isProductDuplicated(String productName) {
        Product existingProduct = productRepository.findByNameAndStatus(productName, ProductStatus.ACTIVE);
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

        Optional<Product> product1 = productRepository.findById(product.getIdProduct());

        if (product1.isPresent()) {
            return productRepository.save(product);
        } else {
            log.error("No existe producto con id: " + product.getIdProduct());
            return null;
        }
    }

    public Product SaveProduct(Product product) {

        Product productToSave = productRepository.save(product);
        log.info("Producto " + productToSave.toString() + " guardado con exito.");
        return productToSave;
    }
}
