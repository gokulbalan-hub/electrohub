package com.training.electriccircuit.service;

import java.util.List;

import com.training.electriccircuit.dto.UserRequestDto;
import com.training.electriccircuit.entity.User;

public interface UserService {

    // Register User
    User saveUser(User user);

    // Get All Users
    List<User> getAllUsers();

    // Get User By Id
    User getUserById(Integer id);

    // Delete User
    void deleteUser(Integer id);

    // Create User From DTO
    void userCreate(UserRequestDto userRequestDto);

    // Login
    User login(String email, String password);

    // Check Email Exists
    boolean emailExists(String email);

    // Get Users By Role
    List<User> getUsersByRole(String role);
}