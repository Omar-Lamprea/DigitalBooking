package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> searchAll() {
        return productRepository.findAll();
    }

    public List<Product> searchAllByStatus() {
        return productRepository.findAllByStatus(Status.ACTIVE);
    }

    public Product searchById(Integer id) {

        Optional<Product> product = productRepository.findById(id);

        if (product.isPresent()) {
            return product.get();
        } else {
            return null;
        }
    }

    public boolean isProductDuplicatedByName(String productName) {
        Product existingProduct = productRepository.findByNameAndStatus(productName, Status.ACTIVE);
        return existingProduct != null;
    }

    public boolean isProductDuplicatedByCodeProduct(Integer codeProduct) {
        Product existingProduct = productRepository.findByCodeProductAndStatus(codeProduct, Status.ACTIVE);
        return existingProduct != null;
    }

    public void deleteById(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setStatus(Status.DELETED);
            productRepository.save(product);
        }
    }

    public Product updateProduct(Product product) {

        Optional<Product> product1 = productRepository.findById(product.getProductId());

        if (product1.isPresent()) {
            return productRepository.save(product);
        } else {
            log.error("No existe producto con id: " + product.getProductId());
            return null;
        }
    }

    public Product saveProduct(Product product) {

        Product productToSave = productRepository.save(product);
        log.info("Producto " + productToSave.toString() + " guardado con exito.");
        return productToSave;
    }

    public List<Product> getByCategory(int id) {
        return productRepository.findByCategoryCategoryId(id).stream()
                .filter(product -> product.getStatus()
                        .equals(Status.ACTIVE)).collect(Collectors.toList());

    }

    public List<Product> getByCity(City city) {
        return productRepository.findByCityAndStatus(city, Status.ACTIVE);
    }

    public List<Product> getByCityAndDatesAndDistance(double lat, double lng, int distance, String cityName, LocalDate checkInDate, LocalDate checkOutDate) {
        return productRepository.findActiveProductsWithoutBookingAndWithInDistanceByCityAndDates(lat, lng, distance, cityName, checkInDate, checkOutDate, Status.ACTIVE);
    }

    public List<Product> getByDatesAndDistance(Double lat, Double lng, int distance, LocalDate checkInDate, LocalDate checkOutDate) {
        return productRepository.findActiveProductsWithoutBookingAndWithInDistanceByDates(lat, lng, distance, checkInDate, checkOutDate, Status.ACTIVE);
    }

    public List<Product> getByCityAndDistance(Double longitude, Double latitude, int distance, String cityName) {
        return productRepository.findActiveProductsWithInDistanceByCity(longitude, latitude, distance, cityName, Status.ACTIVE);
    }

    public List<Product> getByDistance(Double longitude, Double latitude, int distance) {
        return productRepository.findActiveProductsWithInDistance(longitude, latitude, distance, Status.ACTIVE);
    }
}
