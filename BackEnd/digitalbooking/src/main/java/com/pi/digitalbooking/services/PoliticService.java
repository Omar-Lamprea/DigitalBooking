package com.pi.digitalbooking.services;

import com.pi.digitalbooking.models.Politic;
import com.pi.digitalbooking.repository.PoliticRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class PoliticService {
    @Autowired
    private PoliticRepository politicRepository;

    public Politic SavePolitic(Politic politic) {

        Politic politicToSave = politicRepository.save(politic);
        log.info("Producto " + politicToSave.toString() + " guardado con exito.");
        return politicToSave;
    }
}
