package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.pi.digitalbooking.DTO.ProductDTO;
import com.pi.digitalbooking.configurations.AWSService;
import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.exceptions.ProductNotFoundException;

import com.pi.digitalbooking.models.*;
import com.pi.digitalbooking.repository.AmenityRepository;
import com.pi.digitalbooking.services.*;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin
@MultipartConfig(
        maxFileSize = 1024 * 1024 * 50, // 50MB
        maxRequestSize = 1024 * 1024 * 250 // 250MB
)
@RequestMapping("/product")
@Tag(name = "Product", description = "Everything about your Products")
public class ProductController {

    public static final String HTTP_STATUS_CODE = "HttpStatusCode";
    public static final String ERROR_MESSAGE = "ErrorMessage";
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductImageService productImageService;
    @Autowired
    private AmenityRepository amenityRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private PoliticService politicService;
    @Autowired
    private HomeRuleService homeRuleService;
    @Autowired
    private HealthAndSecurityService healthAndSecurityService;

    @Autowired
    private CityService cityService;

    @Operation(summary = "Add a new product", description = "Adds a new product by uploading an image file and providing product information.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product added successfully."),
            @ApiResponse(responseCode = "500", description = "Internal Server Error."),
            @ApiResponse(responseCode = "400", description = "Bad request - some property is empty."),
            @ApiResponse(responseCode = "409", description = "Product duplicated.")
    })
    @CrossOrigin
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createProduct(@RequestBody(description = "Image file", required = true) @RequestPart List<MultipartFile> images,
                                                @RequestBody(description = "Product information as JSON string", required = true) @RequestPart String stringProduct) throws IOException {

        Map<String, String> response = new HashMap<>();
        ProductDTO productDTO = new ProductDTO();

        try {
            productDTO = getProductDTO(stringProduct);
        } catch (JsonProcessingException exception) {
            response.put("Error Message", "Error al procesar el objeto JSON del producto");
            response.put(HTTP_STATUS_CODE, String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()));
            return getStringResponseEntity(response);
        }

        if (validatePropertiesProduct(productDTO)) {
            response.put(ERROR_MESSAGE, "El producto debe tener todas las propiedades no vacías.");
            response.put(HTTP_STATUS_CODE, String.valueOf(HttpStatus.BAD_REQUEST.value()));
            return getStringResponseEntity(response);
        }

        if (productService.isProductDuplicatedByName(productDTO.getName()) || productService.isProductDuplicatedByCodeProduct(productDTO.getCodeProduct())) {
            response.put(ERROR_MESSAGE, "El nombre o código del producto proporcionado ya existe. Por favor, elige un nombre o código diferente para evitar duplicados.");
            response.put(HTTP_STATUS_CODE, String.valueOf(HttpStatus.CONFLICT.toString()));
            return getStringResponseEntity(response);
        }

        List<Amenity> amenities = productDTO.getAmenities();

        if (hasAmenitiesDuplicates(amenities)) {
            response.put(ERROR_MESSAGE, "La lista de caracteristicas del producto contiene duplicados.");
            response.put(HTTP_STATUS_CODE, String.valueOf(HttpStatus.CONFLICT.toString()));
            return getStringResponseEntity(response);
        }

        List<String> imagesURLs = new ArrayList<>();

        for (MultipartFile image : images) {
            String fileName = image.getOriginalFilename();
            File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + fileName);
            image.transferTo(tempFile);

            AWSService awsService = AWSService.getInstance();

            String key = "product-images/" + productDTO.getName() + "/" + fileName;
            awsService.uploadFile(awsService.bucketName, key, tempFile);
            tempFile.delete();

            long expirationTimeMillis = 360000000L;
            String imageUrl = awsService.generatePresignedUrl(awsService.bucketName, key, expirationTimeMillis);

            imagesURLs.add(imageUrl);
        }

        Product product = getProduct(productDTO);
        Product newProduct = productService.saveProduct(product);
        productImageService.addImagesToProduct(newProduct, imagesURLs);

        for (Amenity amenity : amenities) {
            amenity.setProduct(product);
            amenityRepository.save(amenity);
        }

        response.put("Message", "Producto '" + product.getProductId().toString() + "' guardado con éxito");
        response.put(HTTP_STATUS_CODE, String.valueOf(HttpStatus.CREATED.value()));
        return getStringResponseEntity(response);
    }

    public boolean hasAmenitiesDuplicates(List<Amenity> amenities) {
        Set<String> names = new HashSet<>();

        for (Amenity amenity : amenities) {
            String name = amenity.getName();

            if (names.contains(name)) {
                // Se encontró un duplicado
                return true;
            }
            names.add(name);
        }
        // No se encontraron duplicados
        return false;
    }

    private boolean validatePropertiesProduct(ProductDTO productDTO) {
        return productDTO.getName() == null || productDTO.getName().isEmpty()
                || productDTO.getDescription() == null || productDTO.getDescription().isEmpty()
                || productDTO.getPrice() == null
                || productDTO.getScore() == null
                || productDTO.getCategory() == null;
    }

    private ResponseEntity<String> getStringResponseEntity(Map response) {
        String jsonBody;

        try {
            jsonBody = new ObjectMapper().writeValueAsString(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        switch (response.get(HTTP_STATUS_CODE).toString()) {
            case "201":
                return ResponseEntity.status(HttpStatus.CREATED).body(jsonBody);
            case "209":
                return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonBody);
            case "500":
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(jsonBody);
            case "400":
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonBody);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(jsonBody);
    }

    private Product getProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setCodeProduct(productDTO.getCodeProduct());
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setScore(productDTO.getScore());
        product.setPrice(productDTO.getPrice());
        product.setLocationUrl(productDTO.getLocationUrl());

        City city = cityService.SearchById(productDTO.getCity());
        product.setCity(city);

        Politic politicSaved = getPolitic(productDTO);
        product.setPolitic(politicSaved);

        Category category = categoryService.SearchById(productDTO.getCategory());

        product.setCategory(category);
        product.setStatus(ProductStatus.ACTIVE);
        return product;
    }

    private Politic getPolitic(ProductDTO productDTO) {
        Politic politic = productDTO.getPolitic();
        List<HomeRule> homeRules = productDTO.getPolitic().getHomeRules();
        List<HealthAndSecurityRule> healthAndSecurityRules = productDTO.getPolitic().getHealthAndSecurityRules();

        List<HomeRule> homeRulesEmpty = new ArrayList<>();
        List<HealthAndSecurityRule> healthAndSecurityRulesEmpty = new ArrayList<>();
        politic.setHomeRules(homeRulesEmpty);
        politic.setHealthAndSecurityRules(healthAndSecurityRulesEmpty);
        Politic politicSaved = politicService.SavePolitic(politic);

        for (HomeRule homeRule : homeRules) {
            HomeRule homeRuleToSave = new HomeRule();
            homeRuleToSave.setPolitic(politicSaved);
            homeRuleToSave.setHomeRuleDescription(homeRule.getHomeRuleDescription());
            homeRuleService.SaveHomeRule(homeRuleToSave);
        }

        for (HealthAndSecurityRule healthAndSecurityRule : healthAndSecurityRules) {
            HealthAndSecurityRule healthAndSecurityRuleToSave = new HealthAndSecurityRule();
            healthAndSecurityRuleToSave.setPolitic(politicSaved);
            healthAndSecurityRuleToSave.setHealthAndSecurityRuleDescription(healthAndSecurityRule.getHealthAndSecurityRuleDescription());
            healthAndSecurityService.SaveHealthAndSecurityRule(healthAndSecurityRuleToSave);
        }
        return politicSaved;
    }

    private ProductDTO getProductDTO(String stringProduct) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductDTO productDTO = objectMapper.readValue(stringProduct, ProductDTO.class);
        return productDTO;
    }

    @Operation(summary = "Get product by ID", description = "Retrieves a product by its ID.")
    @ApiResponse(responseCode = "200", description = "Product found", content = @Content(schema = @Schema(implementation = Product.class)))
    @ApiResponse(responseCode = "404", description = "Product not found")
    @CrossOrigin
    @GetMapping("/{id}")
    @ResponseBody
    public Product getByPathVariable(@Parameter(description = "ID of the product to retrieve", required = true) @PathVariable("id") Integer id) throws ProductNotFoundException {
        Product productToGet = productService.searchById(id);

        if (productToGet == null) {
            throw new ProductNotFoundException("El producto no existe.");
        }

        return productToGet;
    }

    @Operation(summary = "Get product by ID (request parameter)", description = "Retrieves a product by its ID using a request parameter.")
    @ApiResponse(responseCode = "200", description = "Product found", content = @Content(schema = @Schema(implementation = Product.class)))
    @ApiResponse(responseCode = "404", description = "Product not found")
    @CrossOrigin
    @GetMapping("/search")
    @ResponseBody
    public Product getByRequestParam(@Parameter(description = "ID of the product to retrieve", required = true) @RequestParam Integer id) throws ProductNotFoundException {

        Product productToGet = productService.searchById(id);

        if (productToGet == null) {
            throw new ProductNotFoundException("El producto no existe.");
        }

        return productToGet;
    }

    @Operation(summary = "Delete product by ID", description = "Deletes a product by its ID.")
    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteByPathVariable(@Parameter(description = "ID of the product to delete", required = true) @PathVariable("id") Integer id) {

        Product productToGet = productService.searchById(id);

        if (productToGet == null || productToGet.getStatus().equals(ProductStatus.DELETED)) {
            throw new ProductNotFoundException("El producto no existe o ya fue elimnado.");
        }

        productService.deleteById(id);
    }

    @Operation(summary = "Search all products", description = "Retrieves a list of all products.")
    @ApiResponse(responseCode = "200", description = "List of products", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class))))
    @CrossOrigin
    @GetMapping("/all")
    @ResponseBody
    public List<Product> searchAll() {
        return productService.searchAllByStatus();
    }

    @Operation(summary = "Update a product", description = "Updates an existing product.")
    @ApiResponse(responseCode = "200", description = "Updated product")
    @CrossOrigin
    @PutMapping()
    @ResponseBody
    public Product update(@RequestBody Product product) {

        return productService.updateProduct(product);
    }


    @Operation(summary = "Search all products by category", description = "Retrieves a list of all products by category.")
    @ApiResponse(responseCode = "200", description = "List of products by category", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class))))
    @CrossOrigin
    @GetMapping("/productByCategory/{id}")
    @ResponseBody
    public List<Product> findByCategory(@PathVariable("id") Integer id) {
        return productService.getByCategory(id);
    }


    @Operation(summary = "Search all products by city and dates", description = "Retrieves a list of all products by city and dates.")
    @ApiResponse(responseCode = "200", description = "List of products by city filtered", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Product.class))))
    @CrossOrigin
    @GetMapping()
    @ResponseBody
    public ResponseEntity<?> findByCityClosestToCoordinatesWithoutBooking(@RequestParam("lat") Double longitude,
                                                      @RequestParam("lon") Double latitude,
                                                      @RequestParam("within") Integer within,
                                                      @RequestParam("city") String cityName,
                                                      @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                      @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate) {
        ResponseEntity<?> response;
        try {
            List<Product> products = productService.getByCityAndDates(longitude, latitude, within, cityName, checkInDate, checkOutDate);
            response = ResponseEntity.ok(products);
        } catch (Exception e) {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return response;
    }
}