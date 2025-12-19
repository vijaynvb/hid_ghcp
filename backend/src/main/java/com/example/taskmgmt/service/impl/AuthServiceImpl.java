package com.example.taskmgmt.service.impl;

import com.example.taskmgmt.dto.LoginRequest;
import com.example.taskmgmt.dto.LoginResponse;
import com.example.taskmgmt.dto.UserDto;
import com.example.taskmgmt.exception.ApiException;
import com.example.taskmgmt.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

/**
 * In-memory stub implementation for authenticating a single demo user.
 */
@Service
public class AuthServiceImpl implements AuthService {

    private static final String DEMO_USERNAME = "admin";
    private static final String DEMO_PASSWORD = "admin";
    private static final String DEMO_TOKEN = "dev-admin-token";

    @Override
    public LoginResponse authenticate(LoginRequest request) {
        if (request == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST.value(), "Missing login request");
        }
        if (DEMO_USERNAME.equalsIgnoreCase(request.getUsername()) && DEMO_PASSWORD.equals(request.getPassword())) {
            return new LoginResponse(DEMO_TOKEN);
        }
        throw new ApiException(HttpStatus.UNAUTHORIZED.value(), "Invalid username or password");
    }

    @Override
    public UserDto resolveUser(String token) {
        if (DEMO_TOKEN.equals(token)) {
            UserDto user = new UserDto();
            user.setId("11111111-1111-1111-1111-111111111111");
            user.setUsername(DEMO_USERNAME);
            user.setDisplayName("Administrator");
            user.setEmail("admin@example.com");
            user.setRole("Admin");
            user.setTeamId(null);
            return user;
        }
        throw new ApiException(HttpStatus.UNAUTHORIZED.value(), "Invalid or expired token");
    }
}
