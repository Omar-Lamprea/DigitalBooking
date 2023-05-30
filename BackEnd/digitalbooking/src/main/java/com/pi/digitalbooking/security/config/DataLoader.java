package com.pi.digitalbooking.security.config;

import com.pi.digitalbooking.entities.AppUser;
import com.pi.digitalbooking.entities.AppUserRole;
import com.pi.digitalbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    private final UserRepository userRepository;

    @Autowired
    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void run(ApplicationArguments args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        AppUser user = new AppUser();
        AppUser userAdmin = new AppUser();
        String hashedPassword = passwordEncoder.encode("password");
        user.setName("Apolo");
        user.setLastName("Márquez");
        user.setPassword(hashedPassword);
        user.setEmail("apolo@dh.com");
        user.setRole(AppUserRole.ROLE_USER);


        userAdmin.setName("Nina");
        userAdmin.setLastName("Márquez");
        userAdmin.setPassword(hashedPassword);
        userAdmin.setEmail("nina@dh.com");
        userAdmin.setRole(AppUserRole.ROLE_ADMIN);

        userRepository.save(user);
        userRepository.save(userAdmin);
    }
}
