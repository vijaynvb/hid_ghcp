package com.example.taskmgmt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springdoc.core.GroupedOpenApi;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Task Management API")
                        .version("0.0.1")
                        .description("API documentation for Task Management backend")
                        .contact(new Contact().name("Dev Team").email("dev@example.com")))
                .addServersItem(new Server().url("http://localhost:8080").description("Local server"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("task-management")
                .packagesToScan("com.example")
                .pathsToMatch("/**")
                .build();
    }
}
