package com.training.electriccircuit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.training.electriccircuit.dto.LoginResponse;
import com.training.electriccircuit.entity.User;
import com.training.electriccircuit.repository.UserRepository;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ================= REGISTER =================

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Every new user will be USER
        user.setRole("USER");

        return userRepository.save(user);
    }

    // ================= LOGIN =================

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody User loginUser) {

        User user = userRepository
                .findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user != null &&
                passwordEncoder.matches(
                        loginUser.getPassword(),
                        user.getPassword())) {

            return new LoginResponse(
                    user.getId(),
                    user.getName(),
                    user.getRole(),
                    "SUCCESS");
        }

        return new LoginResponse(
                null,
                null,
                null,
                "INVALID_CREDENTIALS");
    }

    // ================= GET ALL USERS =================

    @GetMapping("/all")
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // ================= GET USER BY ID =================

    @SuppressWarnings("null")
	@GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {

        return userRepository
                .findById(id)
                .orElse(null);

    }

    // ================= UPDATE USER =================

    @PutMapping("/update/{id}")
    public User updateUser(
            @PathVariable Integer id,
            @RequestBody User updatedUser) {

        @SuppressWarnings("null")
		User user = userRepository
                .findById(id)
                .orElse(null);

        if (user == null) {
            return null;
        }

        // Update Name
        user.setName(updatedUser.getName());

        // Update Email
        user.setEmail(updatedUser.getEmail());

        // Role will NOT be updated here
        // Only Super Admin can change role

        // Update Password
        if (updatedUser.getPassword() != null &&
                !updatedUser.getPassword().trim().isEmpty()) {

            user.setPassword(
                    passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(user);

    }

    // ================= CHANGE ROLE (SUPER ADMIN) =================

    @PutMapping("/change-role/{id}")
    public User changeRole(
            @PathVariable Integer id,
            @RequestParam String role) {

        @SuppressWarnings("null")
		User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        // Super Admin role cannot be changed
        if ("SUPER_ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Super Admin Role Cannot Be Changed");
        }

        user.setRole(role);

        return userRepository.save(user);

    }

    // ================= DELETE USER =================

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Integer id) {

        @SuppressWarnings("null")
		User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return "User Not Found";
        }

        if ("SUPER_ADMIN".equals(user.getRole())) {
            return "Super Admin Cannot Be Deleted";
        }

        userRepository.delete(user);

        return "User Deleted Successfully";

    }

}