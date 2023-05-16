package com.pi.digitalbooking.controllers;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.ProductDTO;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.services.ProductService;
import jakarta.servlet.annotation.MultipartConfig;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

@RestController
@MultipartConfig(
        maxFileSize = 1024 * 1024 * 5, // 5MB
        maxRequestSize = 1024 * 1024 * 10 // 10MB
)
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/product", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product AddProduct(@RequestPart MultipartFile file, @RequestPart String stringProduct) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        ProductDTO productDTO = objectMapper.readValue(stringProduct, ProductDTO.class);

        String fileName = file.getOriginalFilename();
        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + fileName);
        file.transferTo(tempFile);

        AmazonS3 s3client = AmazonS3ClientBuilder.standard()
                .withRegion(Regions.US_EAST_1)
                .withCredentials(new DefaultAWSCredentialsProviderChain())
                .build();

        String bucketName = "dh-g8-test";
        String key = "product-images/" + fileName;
        PutObjectRequest request = new PutObjectRequest(bucketName, key, tempFile);

        s3client.putObject(request);
        tempFile.delete();

        long millis = System.currentTimeMillis();
        String url = s3client.generatePresignedUrl(bucketName, key, new Date(millis+ + 3600000)).toString();

        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setImageUrl(url);
        product.setScore(productDTO.getScore());
        product.setLocationUrl(productDTO.getLocationUrl());

        return productService.SaveProduct(product);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Product GetByPathVariable(@PathVariable("id") Integer id) {
        return productService.SearchById(id);
    }

    @GetMapping("/RP")
    @ResponseBody
    public Product GetByRequestParam(@RequestParam Integer id) {
        return productService.SearchById(id);
    }

    @DeleteMapping("/delete")
    public void DeleteProductRP(@RequestParam Integer id) {
        productService.DeleteById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void DeleteProductByPathVariable(@PathVariable("id") Integer id) {
        productService.DeleteById(id);
    }

    @GetMapping()
    @ResponseBody
    public List<Product> SearchAll() {
        return productService.SearchAll();
    }

    @PutMapping("/update")
    @ResponseBody
    public Product UpdateProduct(@RequestBody Product product) {

        return productService.UpdateProduct(product);
    }
}
