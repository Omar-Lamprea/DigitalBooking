package com.pi.digitalbooking.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.CountryDTO;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.exceptions.ProductNotFoundException;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.services.CountryService;
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
@RequestMapping("/country")
@Tag(name = "Country", description = "Everything about your Countries.")
public class CountryController {

    @Autowired
    private CountryService countryService;


    @Operation(summary = "Add a new Country", description = "Adds a new country providing its information.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Country added successfully."),
            @ApiResponse(responseCode = "500", description = "Internal Server Error."),
            @ApiResponse(responseCode = "400", description = "Bad request - some property is empty."),
            @ApiResponse(responseCode = "409", description = "Country duplicated.")
    })
    @CrossOrigin
    @PostMapping()
    public ResponseEntity<String> createCountry(@RequestBody(description = "Country information as JSON string", required = true)
                                                    @org.springframework.web.bind.annotation.RequestBody CountryDTO countryDTO) throws IOException, IOException {

        Map<String, String> response = new HashMap<>();

        if (validatePropertiesCountry(countryDTO)) {
            response.put("ErrorMessage", "El pais no debe tener propiedades vacías.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.BAD_REQUEST.value()));
            return getStringResponseEntity(response);
        }

        if (countryService.isCountryDuplicatedByName(countryDTO.getName())) {
            response.put("ErrorMessage", "El nombre del pais proporcionado ya existe. Por favor, elige un nombre diferente para evitar duplicados.");
            response.put("HttpStatusCode", String.valueOf(HttpStatus.CONFLICT.toString()));
            return getStringResponseEntity(response);
        }

        Country country = GetCountry(countryDTO);
        countryService.SaveCountry(country);

        response.put("Message", "Pais guardado con éxito");
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

    private boolean validatePropertiesCountry(CountryDTO countryDTO) {
        return countryDTO.getName() == null || countryDTO.getName().isEmpty();
    }

    private Country GetCountry(CountryDTO countryDTO) {
        Country country = new Country();

        country.setName(countryDTO.getName());
        country.setStatus(Status.ACTIVE);

        return country;
    }

    @Operation(summary = "Search all countries", description = "Retrieves a list of all countries.")
    @ApiResponse(responseCode = "200", description = "List of countries", content = @Content(array = @ArraySchema(schema = @Schema(implementation = Country.class))))
    @CrossOrigin
    @GetMapping("/all")
    @ResponseBody
    public List<Country> SearchAll() {
        return countryService.SearchAllByStatus();
    }

    @Operation(summary = "Get country by ID", description = "Retrieves a country by its ID.")
    @ApiResponse(responseCode = "200", description = "Country found", content = @Content(schema = @Schema(implementation = Country.class)))
    @ApiResponse(responseCode = "404", description = "Country not found")
    @CrossOrigin
    @GetMapping("/{id}")
    @ResponseBody
    public Country GetByPathVariable(@Parameter(description = "ID of the country to retrieve", required = true) @PathVariable("id") Integer id) throws ProductNotFoundException {
        Country countryToGet = countryService.SearchById(id);

        if (countryToGet == null) {
            throw new ProductNotFoundException("El pais no existe.");
        }

        return countryToGet;
    }
}
