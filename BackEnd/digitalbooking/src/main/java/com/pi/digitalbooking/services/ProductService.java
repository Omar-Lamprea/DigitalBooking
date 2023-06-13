package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.models.Booking;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
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
        return productRepository.findAllByStatus(ProductStatus.ACTIVE);
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
        Product existingProduct = productRepository.findByNameAndStatus(productName, ProductStatus.ACTIVE);
        return existingProduct != null;
    }

    public boolean isProductDuplicatedByCodeProduct(Integer codeProduct) {
        Product existingProduct = productRepository.findByCodeProductAndStatus(codeProduct, ProductStatus.ACTIVE);
        return existingProduct != null;
    }

    public void deleteById(Integer productId) {

        Product product = productRepository.findById(productId).orElse(null);
        if (product != null) {
            product.setStatus(ProductStatus.DELETED);
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
                        .equals(ProductStatus.ACTIVE)).collect(Collectors.toList());

    }

    public List<Product> getByCityFiltered(String city, String date) {

        String fechaString = date;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate fechaResult = LocalDate.parse(fechaString, formatter);

        List<Booking> reservations = Booking.getReservations();
        reservations.stream().map(reservation ->{
            log.info("La feccha reserva  es " + reservation.getStartDate());
            log.info("La fechaResult es " + fechaResult);
            List reservationsList = new ArrayList();
            while 
        }).collect(Collectors.toList());

        List<Product> productList = new ArrayList<>();
        if (!reservations.isEmpty()) {
            log.info(" Ingresa al if para setear product por ciudad y reservations es " + reservations);
            productList=  productRepository.findByCityStartingWith(city).stream()
                    .filter(product -> product.getStatus()
                            .equals(ProductStatus.ACTIVE)).collect(Collectors.toList());
        }

        return productList;
    }


}
