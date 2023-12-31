package com.pi.digitalbooking.security.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pi.digitalbooking.DTO.AppUserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final ObjectMapper mapper = new ObjectMapper();

    private final String SECRET_KEY = "ThisSecretDiesWithUs";

    public String extractUserName(String token) {
        return extractClaimUsername(token);
    }

    public Date extractExpiration(String token) {
        return extractClaimDate(token);
    }

    public Date extractClaimDate(String token){
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    public String extractClaimUsername(String token){
        AppUserDto userDto = null;
        Claims claims = extractAllClaims(token);
        try {
            userDto = mapper.readValue(claims.getSubject(), AppUserDto.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userDto.getEmail();
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String generateToken(AppUserDto userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.toString());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMonths(1).toInstant()))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }




}
