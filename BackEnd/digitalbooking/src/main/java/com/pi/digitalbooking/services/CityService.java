package com.pi.digitalbooking.services;

import com.pi.digitalbooking.enums.Status;
import com.pi.digitalbooking.models.City;
import com.pi.digitalbooking.models.Country;
import com.pi.digitalbooking.repository.CityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CountryService countryService;

    public List<City> SearchAll() {
        return cityRepository.findAll();
    }

    public City SearchById(Integer id) {

        Optional<City> city = cityRepository.findById(id);

        if (city.isPresent()) {
            return city.get();
        } else {
            return null;
        }
    }

    public void DeleteById(Integer cityId) {

        City city = cityRepository.findById(cityId).orElse(null);

        if (city != null) {
            city.setStatus(Status.DELETED);
            cityRepository.save(city);
        }
    }

    public City SaveCity(City city) {

        City cityToSave = cityRepository.save(city);
        log.info("Ciudad " + cityToSave.toString() + " guardada con exito.");
        return cityToSave;
    }

    public boolean isCityDuplicatedByName(String cityName) {
        City existingCity = cityRepository.findByNameAndStatus(cityName, Status.ACTIVE);
        return existingCity != null;
    }

    public City findByName(String cityName) {
        City existingCity = cityRepository.findByNameAndStatus(cityName, Status.ACTIVE);
        return existingCity;
    }

    public List<City> SearchAllByStatus() {
        return cityRepository.findAllByStatus(Status.ACTIVE);
    }

    public List<City> SearchCitiesByCountry(String nameCountry) {
        Country country = countryService.GetCountryByName(nameCountry);
        return cityRepository.findByCountryAndStatus(country, Status.ACTIVE);
    }

    public City updateCity(Integer idCity, String nameToUpdate) throws Exception {

        Optional<City> existingCity = cityRepository.findById(idCity);

        if (existingCity.isPresent()) {

            if (isCityDuplicatedByName(nameToUpdate)) {
                throw new Exception("CITY_DUPLICATED");
            }
            existingCity.get().setName(nameToUpdate);
            City cityToSave = existingCity.get();
            return cityRepository.save(cityToSave);
        } else {
            log.error("No existe ciudad con id: " + idCity.toString());
            throw new Exception("CITY_NOT_FOUND");
        }
    }
}
