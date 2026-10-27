package com.training.electriccircuit.serviceImplementation;

import java.util.List;

import org.springframework.stereotype.Service;

import com.training.electriccircuit.dto.UserRequestDto;
import com.training.electriccircuit.entity.User;
import com.training.electriccircuit.repository.UserRepository;
import com.training.electriccircuit.service.UserService;

@Service
public class UserServiceImplementation implements UserService {

    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }

    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @SuppressWarnings("null")
	@Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    @SuppressWarnings("null")
	@Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public void userCreate(UserRequestDto userRequestDto) {

        User user = new User();

        user.setName(userRequestDto.getName());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());

        // Default Role
        user.setRole("USER");

        userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {

        return userRepository.findByEmail(email).orElse(null);

    }
    

    @Override
    public boolean emailExists(String email) {

        return userRepository
                .existsByEmail(email);
    }

    @Override
    public List<User> getUsersByRole(String role) {

        return userRepository
                .findByRole(role);
    }
}