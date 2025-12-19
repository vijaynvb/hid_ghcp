package com.example.taskmgmt.config;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    private static final String DEFAULT_ALLOWED_ORIGIN = "http://localhost:4200";

    private final List<String> allowedOrigins;

    /**
     * Creates a CORS configuration that reads allowed origins from configuration properties.
     */
    public CorsConfig(@Value("${app.cors.allowed-origins:" + DEFAULT_ALLOWED_ORIGIN + "}") List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins.stream()
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .collect(Collectors.toList());
    }

    /**
     * Registers global CORS mappings so the frontend can call the API during development.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                String[] origins = allowedOrigins.isEmpty()
                        ? new String[] { DEFAULT_ALLOWED_ORIGIN }
                        : allowedOrigins.toArray(new String[0]);
                registry.addMapping("/**")
                        .allowedOrigins(origins)
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Location")
                        .allowCredentials(true);
            }
        };
    }
}
