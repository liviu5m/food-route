package com.foodroute.foodroute.service;

import com.foodroute.foodroute.model.User;
import com.foodroute.foodroute.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByUsername(String email) {
        return userRepository.findByUsername(email);
    }
}
