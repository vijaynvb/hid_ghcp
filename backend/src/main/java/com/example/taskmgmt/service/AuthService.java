package com.example.taskmgmt.service;

import com.example.taskmgmt.dto.LoginRequest;
import com.example.taskmgmt.dto.LoginResponse;
import com.example.taskmgmt.dto.UserDto;

/**
 * Contract for authenticating users and resolving their profile based on access tokens.
 */
public interface AuthService {
    LoginResponse authenticate(LoginRequest request);

    UserDto resolveUser(String token);
}
