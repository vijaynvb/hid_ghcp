package com.example.taskmgmt.controller;

import com.example.taskmgmt.dto.UserDto;
import com.example.taskmgmt.domain.User;
import com.example.taskmgmt.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
public class UsersController {

    private final UserService userService;

    public UsersController(UserService userService) { this.userService = userService; }

    @GetMapping
    public ResponseEntity<List<UserDto>> listUsers() {
        return ResponseEntity.ok(userService.listUsers());
    }

    @PostMapping
    public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto dto) {
        UserDto created = userService.createUser(dto);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String userId, @Valid @RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.updateUser(userId, dto));
    }
}
