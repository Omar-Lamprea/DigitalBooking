package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.DTO.AppUserCreateDto;
import com.pi.digitalbooking.DTO.AppUserDto;
import com.pi.digitalbooking.security.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody AppUserCreateDto user) {
        if(user.getRole() == null) return ResponseEntity.badRequest().body("El rol (role) es requerido.");
        AppUserDto newUser = null;
        try {
            newUser = appUserService.createUser(user);
        } catch (Exception e) {
            switch (e.getMessage()) {
                case "USER_EXISTS" -> {
                    return ResponseEntity.badRequest().body("User already exists.");
                }
                case "BAD_REQUEST" -> {
                    return ResponseEntity.badRequest().build();
                }
            }
        }
        return ResponseEntity.ok(newUser);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        AppUserDto user = null;
        try {
            user = appUserService.getUserByEmail(email);
        } catch (Exception e) {
            switch (e.getMessage()) {
                case "USER_NOT_FOUND" -> {
                    return ResponseEntity.badRequest().body("User was not found.");
                }
            }
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping()
    public ResponseEntity<?> getUsers() {
        List<AppUserDto> users = null;
        try {
            users = appUserService.getAllUsers();
        } catch (Exception e) {
            switch (e.getMessage()) {
                case "USERS_NOT_FOUND" -> {
                    return ResponseEntity.badRequest().body("There are no users.");
                }
            }
        }
        return ResponseEntity.ok(users);
    }
    @PatchMapping("/{email}")
    public ResponseEntity<?> updateRole(@RequestParam String role, @PathVariable String email) {
        String decodedEmail = URLDecoder.decode(email, StandardCharsets.UTF_8);
        try {
            appUserService.updateRole(decodedEmail, role);
        } catch (Exception e) {
            switch (e.getMessage()) {
                case "USER_NOT_FOUND" -> {
                    return ResponseEntity.badRequest().body("User was not found.");
                }
            }
        }
        return ResponseEntity.ok("Role updated to " + role);
    }
}
