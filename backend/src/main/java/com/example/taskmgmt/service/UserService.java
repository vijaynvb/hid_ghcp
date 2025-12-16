package com.example.taskmgmt.service;

import com.example.taskmgmt.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> listUsers();
    UserDto createUser(UserDto dto);
    UserDto getUser(String id);
    UserDto updateUser(String id, UserDto dto);
}
