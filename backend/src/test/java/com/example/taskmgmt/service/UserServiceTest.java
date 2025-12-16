package com.example.taskmgmt.service;

import com.example.taskmgmt.dto.UserDto;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserServiceTest {

    @Test
    void sampleUserServiceTest() {
        // TODO: add unit tests with @SpringBootTest or Mockito
        UserDto d = new UserDto();
        d.setUsername("alice");
        d.setDisplayName("Alice");
        d.setEmail("alice@example.com");
        d.setRole("Employee");
        assertEquals("alice", d.getUsername());
    }
}
