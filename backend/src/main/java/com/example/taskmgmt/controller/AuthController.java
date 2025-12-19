package com.example.taskmgmt.controller;

import com.example.taskmgmt.dto.LoginRequest;
import com.example.taskmgmt.dto.LoginResponse;
import com.example.taskmgmt.dto.UserDto;
import com.example.taskmgmt.exception.ApiException;
import com.example.taskmgmt.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Exposes minimal authentication endpoints required by the frontend.
 */
@RestController
@RequestMapping("/auth")
@Validated
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> currentUser(@RequestHeader(value = "Authorization", required = false) String authorization) {
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            throw new ApiException(HttpStatus.UNAUTHORIZED.value(), "Missing bearer token");
        }
        String token = authorization.substring(7).trim();
        if (token.isEmpty()) {
            throw new ApiException(HttpStatus.UNAUTHORIZED.value(), "Missing bearer token");
        }
        return ResponseEntity.ok(authService.resolveUser(token));
    }
}
