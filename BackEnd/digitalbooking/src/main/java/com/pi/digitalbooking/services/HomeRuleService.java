package com.pi.digitalbooking.services;

import com.pi.digitalbooking.models.HomeRule;
import com.pi.digitalbooking.repository.HomeRuleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class HomeRuleService {

    @Autowired
    private HomeRuleRepository homeRuleRepository;

    public HomeRule SaveHomeRule(HomeRule homeRule) {

        HomeRule homeRuleToSave = homeRuleRepository.save(homeRule);
        log.info("Norma de la Casa " + homeRuleToSave.toString() + " se guardo con exito.");
        return homeRuleToSave;
    }


}
