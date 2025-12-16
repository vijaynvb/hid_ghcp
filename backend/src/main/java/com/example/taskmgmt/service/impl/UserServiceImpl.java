package com.example.taskmgmt.service.impl;

import com.example.taskmgmt.domain.User;
import com.example.taskmgmt.dto.UserDto;
import com.example.taskmgmt.repository.UserRepository;
import com.example.taskmgmt.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public List<UserDto> listUsers() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UserDto createUser(UserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setDisplayName(dto.getDisplayName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setTeamId(dto.getTeamId());
        User saved = userRepository.save(user);
        return toDto(saved);
    }

    @Override
    public UserDto getUser(String id) {
        return userRepository.findById(id).map(this::toDto).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public UserDto updateUser(String id, UserDto dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setDisplayName(dto.getDisplayName());
        user.setEmail(dto.getEmail());
        user.setRole(dto.getRole());
        user.setTeamId(dto.getTeamId());
        return toDto(userRepository.save(user));
    }

    private UserDto toDto(User user) {
        UserDto d = new UserDto();
        d.setId(user.getId());
        d.setUsername(user.getUsername());
        d.setDisplayName(user.getDisplayName());
        d.setEmail(user.getEmail());
        d.setRole(user.getRole());
        d.setTeamId(user.getTeamId());
        return d;
    }
}
