package com.pi.digitalbooking.services;

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

    public void DeleteById(Integer id) {
        productRepository.deleteById(id);
    }

    public Product UpdateProduct(Product product) {

        Optional<Product> product1 = productRepository.findById(product.getId_product());

        if (product1.isPresent()) {
            return productRepository.save(product);
        } else {
            log.error("No existe producto con id: " + product.getId_product());
            return null;
        }
    }

    public Product SaveProduct(Product product) {
        Product product1 = productRepository.save(product);
        log.info("Producto " + product1.toString() + " guardado con exito.");
        return product1;
    }
}
