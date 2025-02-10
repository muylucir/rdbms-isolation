package com.multitenancy.hybrid.service;

import com.multitenancy.hybrid.dto.UserDTO;
import com.multitenancy.hybrid.entity.User;
import com.multitenancy.hybrid.mapper.UserMapper;
import com.multitenancy.hybrid.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public List<UserDTO.Response> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<UserDTO.Response> getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toResponse);
    }

    @Transactional(readOnly = true)
    public User getUserEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public UserDTO.Response createUser(UserDTO.SignUpRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        User user = userMapper.toEntity(signUpRequest);
        User savedUser = userRepository.save(user);
        return userMapper.toResponse(savedUser);
    }

    @Transactional
    public Optional<UserDTO.Response> updateUser(Long id, UserDTO.UpdateRequest updateRequest) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Check if new email already exists for another user
                    if (updateRequest.getEmail() != null &&
                            !existingUser.getEmail().equals(updateRequest.getEmail()) &&
                            userRepository.existsByEmail(updateRequest.getEmail())) {
                        throw new RuntimeException("Email already exists");
                    }
                    userMapper.updateEntity(existingUser, updateRequest);
                    User updatedUser = userRepository.save(existingUser);
                    return userMapper.toResponse(updatedUser);
                });
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}