package com.pi.digitalbooking.controllers;

import com.pi.digitalbooking.DTO.AppUserCreateDto;
import com.pi.digitalbooking.DTO.AppUserDto;
import com.pi.digitalbooking.DTO.ProductDTO;
import com.pi.digitalbooking.entities.AppUserRole;
import com.pi.digitalbooking.models.Amenity;
import com.pi.digitalbooking.security.AppUserService;
import com.pi.digitalbooking.services.ProductService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;


public class UserControllerTest {

    @Mock
    private AppUserService appUserService;

    @InjectMocks
    private UserController userController;


    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    public void testCreateUserUserExists() throws Exception {

        AppUserCreateDto userCreateDto = new AppUserCreateDto();
        userCreateDto.setEmail("test@example.com");
        userCreateDto.setPassword("password");
        when(appUserService.createUser(userCreateDto)).thenThrow(new Exception("USER_EXISTS"));
        assertThrows(Exception.class, () -> {
            appUserService.createUser(userCreateDto);
            throw new Exception("USER_EXISTS");
        });
        verify(appUserService, times(1)).createUser(userCreateDto);
    }

    @Test
    public void testGetUserSuccess() throws Exception {

        String email = "emailBooking.com";

        AppUserDto userDto = AppUserDto.builder()
                .email("emailBooking.com")
                .name("Usuario1")
                .lastName("BokkingUser")
                .role(AppUserRole.ROLE_ADMIN)
                .build();

        when(appUserService.getUserByEmail(email)).thenReturn(userDto);
        assertEquals(userDto, appUserService.getUserByEmail(email));

    }


    @Test
    public void testGetUserUserFound() throws Exception {

        String email = "example@example.com";
        AppUserDto userDto = new AppUserDto();
        when(appUserService.getUserByEmail(email)).thenReturn(userDto);

        ResponseEntity<?> response = userController.getUser(email);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDto, response.getBody());
    }



    @Test
    public void testCreateUserSuccess() throws Exception {

        AppUserCreateDto userDto = new AppUserCreateDto();
        AppUserDto newUserDto = new AppUserDto();
        when(appUserService.createUser(userDto)).thenReturn(newUserDto);

        ResponseEntity<?> response = userController.createUser(userDto);
        verify(appUserService, times(1)).createUser(userDto);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(newUserDto, response.getBody());
    }

    @Test
    public void testGetUsersSuccess() throws Exception {

        List<AppUserDto> userDtos = new ArrayList<>();
        userDtos.add(new AppUserDto());
        when(appUserService.getAllUsers()).thenReturn(userDtos);


        ResponseEntity<?> response = userController.getUsers();

        verify(appUserService, times(1)).getAllUsers();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDtos, response.getBody());
    }



    @Test
    public void testUpdateRole_UserFound() throws Exception {

        String role = "admin";
        String email = "example@example.com";
        String decodedEmail = "example@example.com";

        ResponseEntity<?> response = userController.updateRole(role, email);

        verify(appUserService, times(1)).updateRole(decodedEmail, role);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Role updated to " + role, response.getBody());
    }


}