package com.pi.digitalbooking.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.pi.digitalbooking.DTO.AppUserCreateDto;
import com.pi.digitalbooking.DTO.AppUserDto;
import com.pi.digitalbooking.entities.AppUser;
import com.pi.digitalbooking.entities.AppUserRole;
import com.pi.digitalbooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public AppUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username);
    }

    public AppUserDto createUser(AppUserCreateDto user) throws Exception {
        if(userRepository.findByEmail(user.getUsername()) != null) {
            throw new Exception("USER_EXISTS");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        AppUser newUser = userRepository.save(mapToEntity(user));
        return mapToDto(newUser);
    }

    public void updateRole(String email, String newRole) throws Exception {
        AppUser user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("USER_NOT_FOUND");
        }
        user.setRole(AppUserRole.valueOf(newRole));
        userRepository.save(user);
    }

    public AppUserDto getUserByEmail(String email) throws Exception {
        AppUser user = userRepository.findByEmail(email);
        if(user == null) {
            throw new Exception("USER_NOT_FOUND");
        }
        return mapToDto(user);
    }

    public List<AppUserDto> getAllUsers() throws Exception {
        List<AppUser> users = userRepository.findAll();
        if(users.isEmpty()) {
            throw new Exception("USERS_NOT_FOUND");
        }
        return users.stream().map(this::mapToDto).toList();
    }


    private AppUserCreateDto mapToCreateDto (AppUser user) {
        mapper.registerModule(new JavaTimeModule());
        return mapper.convertValue(user, AppUserCreateDto.class);
    }

    private AppUserDto mapToDto (AppUser user) {
        mapper.registerModule(new JavaTimeModule());
        return mapper.convertValue(user, AppUserDto.class);
    }

    private AppUser mapToEntity (AppUserCreateDto userCreateDto) {
        mapper.registerModule(new JavaTimeModule());
        return mapper.convertValue(userCreateDto, AppUser.class);
    }
}
