package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.CategoryDTO;
import com.pi.digitalbooking.configurations.AWSService;
import com.pi.digitalbooking.enums.CategoryStatus;
import com.pi.digitalbooking.models.Category;
import com.pi.digitalbooking.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.servlet.annotation.MultipartConfig;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@MultipartConfig(
        maxFileSize = 1024 * 1024 * 5, // 5MB
        maxRequestSize = 1024 * 1024 * 10 // 10MB
)
@RequestMapping("/category")
@Tag(name = "Category", description = "Everything about your Categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @Operation(summary = "Add a new category", description = "Adds a new category by uploading an image file and providing category information.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category added successfully."),
            @ApiResponse(responseCode = "500", description = "Internal Server Error."),
            @ApiResponse(responseCode = "400", description = "Bad request - some property is empty."),
            @ApiResponse(responseCode = "409", description = "Category duplicated.")
    })
    @CrossOrigin
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<String> createCategory(@RequestBody(description = "Image file", required = true) @RequestPart MultipartFile image,
                                                 @RequestBody(description = "Category information as JSON string", required = true) @RequestPart String stringCategory) throws IOException, IOException {

        Map<String, String> response = new HashMap<>();
        CategoryDTO categoryDTO = new CategoryDTO();

        try {
            categoryDTO = getCategoryDTO(stringCategory);
        } catch (JsonProcessingException exception) {
            response.put("Error Message", "Error al procesar el objeto JSON de la categoria");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()));
            return getStringResponseEntity(response);
        }

        if (validatePropertiesCategory(categoryDTO)) {
            response.put("ErrorMessage", "La categoria no debe tener propiedades vacías.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            return getStringResponseEntity(response);
        }

        if (categoryService.isCategoryDuplicatedByName(categoryDTO.getName())) {
            response.put("ErrorMessage", "El nombre de la categoria proporcionado ya existe. Por favor, elige un nombre diferente para evitar duplicados.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.CONFLICT.toString()));
            return getStringResponseEntity(response);
        }

        String fileName = image.getOriginalFilename();
        File tempFile = new File(System.getProperty("java.io.tmpdir") + "/" + fileName);
        image.transferTo(tempFile);

        AWSService awsService = AWSService.getInstance();

        String key = "category-image/" + categoryDTO.getName() + "/" + fileName;
        awsService.uploadFile(awsService.bucketName, key, tempFile);
        tempFile.delete();

        long expirationTimeMillis = 360000000L;
        String imageUrl = awsService.generatePresignedUrl(awsService.bucketName, key, expirationTimeMillis);

        Category category = GetCategory(categoryDTO, imageUrl);
        categoryService.SaveCategory(category);

        response.put("Message", "Categoria guardada con éxito");
        response.put("HttpStatusCode", String.valueOf(HttpStatus.CREATED.value()));
        return getStringResponseEntity(response);
    }

    private CategoryDTO getCategoryDTO(String stringCategory) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        CategoryDTO categoryDTO = objectMapper.readValue(stringCategory, CategoryDTO.class);
        return categoryDTO;
    }

    private ResponseEntity<String> getStringResponseEntity(Map response) {
        String jsonBody;

        try {
            jsonBody = new ObjectMapper().writeValueAsString(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        switch (response.get("HttpStatusCode").toString()) {
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

    private boolean validatePropertiesCategory(CategoryDTO categoryDTO) {
        return categoryDTO.getName() == null || categoryDTO.getName().isEmpty()
                || categoryDTO.getDescription() == null || categoryDTO.getDescription().isEmpty();
    }

    private Category GetCategory(CategoryDTO categoryDTO, String imageURL) {
        Category category = new Category();

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setImageUrl(imageURL);
        category.setStatus(CategoryStatus.ACTIVE);

        return category;
    }

    @Operation(summary = "Search all categories", description = "Retrieves a list of all categories.")
    @ApiResponse(responseCode = "200", description = "List of categories", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Category.class))))
    @CrossOrigin
    @GetMapping("/all")
    @ResponseBody
    public List<Category> SearchAll() {
        return categoryService.SearchAllByStatus();
    }

    @Operation(summary = "Search all categories", description = "Retrieves a list of categories by id.")
    @ApiResponse(responseCode = "200", description = "List of categories by id", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Category.class))))
    @CrossOrigin
    @GetMapping("/categoryId")
    @ResponseBody
    public List<Category> getCategoryById(@RequestParam("id") int categoryId) {
        return categoryService.getCategoryById(categoryId);
    }





}
