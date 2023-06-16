package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.CityDTO;
import com.pi.digitalbooking.enums.CityStatus;
import com.pi.digitalbooking.enums.ProductStatus;
import com.pi.digitalbooking.exceptions.ProductNotFoundException;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.models.Product;
import com.pi.digitalbooking.services.CityService;
import com.pi.digitalbooking.services.CountryService;
import com.pi.digitalbooking.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/city")
@Tag(name = "City", description = "Everything about your Cities.")
public class CityController {

    @Autowired
    private CityService cityService;
    @Autowired
    private ProductService productService;

    @Autowired
    private CountryService countryService;

    @Operation(summary = "Add a new City", description = "Adds a new city providing its information.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "City added successfully."),
            @ApiResponse(responseCode = "500", description = "Internal Server Error."),
            @ApiResponse(responseCode = "400", description = "Bad request - some property is empty."),
            @ApiResponse(responseCode = "409", description = "City duplicated.")
    })
    @CrossOrigin
    @PostMapping()
    public ResponseEntity<String> createCity(@RequestBody(description = "City information as JSON string", required = true)
                                             @org.springframework.web.bind.annotation.RequestBody CityDTO cityDTO) throws IOException, IOException {

        Map<String, String> response = new HashMap<>();

        if (validatePropertiesCity(cityDTO)) {
            response.put("ErrorMessage", "La ciudad no debe tener propiedades vacías.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            return getStringResponseEntity(response);
        }

        if (cityService.isCityDuplicatedByName(cityDTO.getName())) {
            response.put("ErrorMessage", "El nombre de la ciudad proporcionado ya existe. Por favor, elige un nombre diferente para evitar duplicados.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.CONFLICT.toString()));
            return getStringResponseEntity(response);
        }

        City city = GetCity(cityDTO);
        cityService.SaveCity(city);

        response.put("Message", "Ciudad guardada con éxito");
        response.put("HttpStatusCode", String.valueOf(HttpStatus.CREATED.value()));
        return getStringResponseEntity(response);
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

    private boolean validatePropertiesCity(CityDTO cityDTO) {
        return cityDTO.getName() == null || cityDTO.getName().isEmpty();
    }

    private City GetCity(CityDTO cityDTO) {
        City city = new City();

        city.setName(cityDTO.getName());

        Country country = countryService.SearchById(cityDTO.getCountry());
        city.setCountry(country);
        city.setStatus(CityStatus.ACTIVE);

        return city;
    }

    @Operation(summary = "Search all cities", description = "Retrieves a list of all cities.")
    @ApiResponse(responseCode = "200", description = "List of cities", content = @Content(array = @ArraySchema(schema = @Schema(implementation = City.class))))
    @CrossOrigin
    @GetMapping("/all")
    @ResponseBody
    public List<City> SearchAll() {
        return cityService.SearchAllByStatus();
    }

    @Operation(summary = "Search all cities by Country", description = "Retrieves a list of cities by Country.")
    @ApiResponse(responseCode = "200", description = "List of cities.", content = @Content(array = @ArraySchema(schema = @Schema(implementation = City.class))))
    @CrossOrigin
    @GetMapping("/searchbycountry")
    @ResponseBody
    public List<City> SearchAll(@Parameter(description = "Country name to get its cities.", required = true) @RequestParam String nameCountry) {
        return cityService.SearchCitiesByCountry(nameCountry);
    }

    @Operation(summary = "Delete city by ID", description = "Deletes a city by its ID.")
    @CrossOrigin
    @DeleteMapping("/{id}")
    public void Delete(@Parameter(description = "ID of the city to delete", required = true) @PathVariable("id") Integer id) {

        City city = cityService.SearchById(id);

        List<Product> productsByCity = productService.getByCity(city);

        if (productsByCity.size() != 0) {
            throw new ProductNotFoundException("La ciudad no puede ser eliminada porque tiene productos asociados.");
        }

        cityService.DeleteById(id);
    }
}
