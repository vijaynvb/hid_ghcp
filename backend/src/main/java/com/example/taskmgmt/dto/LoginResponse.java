package com.example.taskmgmt.dto;

/**
 * Simple wrapper for the authentication token returned to clients.
 */
public class LoginResponse {
    private String accessToken;

    public LoginResponse() {
    }

    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
