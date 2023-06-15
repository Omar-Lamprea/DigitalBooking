package com.pi.digitalbooking.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pi.digitalbooking.entities.AppUserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AppUserCreateDto {

    @NotBlank(message = "El nombre (name) es requerido.")
    private String name;
    @NotBlank(message = "El apellido (lastName) es requerido.")
    private String lastName;
    @NotBlank(message = "El correo (email) es requerido.")
    private String email;
    @NotBlank(message = "La contraseña (password) es requerido.")
    private String password;
    private AppUserRole role;

    public String getUsername() {
        return email;
    }
}
