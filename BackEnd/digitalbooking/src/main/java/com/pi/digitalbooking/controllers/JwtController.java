package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.DTO.AppUserDto;
import com.pi.digitalbooking.entities.jwt.AuthenticationRequest;
import com.pi.digitalbooking.entities.jwt.AuthenticationResponse;
import com.pi.digitalbooking.security.AppUserService;
import com.pi.digitalbooking.security.config.jwt.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {
    private final AuthenticationManager authenticationManager;

    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;

    public JwtController(AuthenticationManager authenticationManager, AppUserService appUserService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/auth")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect", e);
        }
        final AppUserDto userDetails = appUserService.getUserByEmail(authenticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse((jwt)));
    }

    @PostMapping("/hello")
    public String hello() {
        return "hello there!";
    }

}
