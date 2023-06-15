package com.pi.digitalbooking.services;

import com.pi.digitalbooking.models.HealthAndSecurityRule;
import com.pi.digitalbooking.repository.HealtAndSecurityRuleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class HealthAndSecurityService {

    @Autowired
    private HealtAndSecurityRuleRepository healtAndSecurityRuleRepository;

    public HealthAndSecurityRule SaveHealthAndSecurityRule(HealthAndSecurityRule healthAndSecurityRule) {

        HealthAndSecurityRule healthAndSecurityRuleToSave = healtAndSecurityRuleRepository.save(healthAndSecurityRule);
        log.info("Norma de Salud y Seguridad " + healthAndSecurityRuleToSave.toString() + " se guardo con exito.");
        return healthAndSecurityRuleToSave;
    }

}
