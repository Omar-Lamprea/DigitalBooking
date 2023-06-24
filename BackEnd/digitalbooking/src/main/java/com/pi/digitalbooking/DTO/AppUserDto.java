package com.pi.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.entities.AppUserRole;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppUserDto {

    private String email;
    private String name;
    private String lastName;
    private AppUserRole role;

    @Override
    public String toString() {
        return "{\"email\":\""+email+"\"," +
                "\"name\":\""+name+"\"," +
                "\"lastName\":\""+lastName+"\"," +
                "\"role\":\""+role+"\"}";


    }
}
