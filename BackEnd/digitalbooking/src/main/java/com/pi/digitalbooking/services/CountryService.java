package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.CityStatus;
import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.repository.CountryRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> SearchAll() {
        return countryRepository.findAll();
    }

    public Country SearchById(Integer id) {

        Optional<Country> country = countryRepository.findById(id);

        if (country.isPresent()) {
            return country.get();
        } else {
            return null;
        }
    }

    public void DeleteById(Integer countryId) {

        Country country = countryRepository.findById(countryId).orElse(null);

        if (country != null) {
            country.setStatus(Status.DELETED);
            countryRepository.save(country);
        }
    }

    public Country SaveCountry(Country country) {

        Country countryToSave = countryRepository.save(country);
        log.info("Pais " + countryToSave.toString() + " guardado con exito.");
        return countryToSave;
    }

    public boolean isCountryDuplicatedByName(String countryName) {
        Country existingCountry = countryRepository.findByNameAndStatus(countryName, Status.ACTIVE);
        return existingCountry != null;
    }

    public Country GetCountryByName(String countryName) {
        Country existingCountry = countryRepository.findByNameAndStatus(countryName, Status.ACTIVE);
        return existingCountry;
    }

    public List<Country> SearchAllByStatus() {
        return countryRepository.findAllByStatus(Status.ACTIVE);
    }

}
