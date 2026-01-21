package com.fitnest.service;

import com.fitnest.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User register(User user);
    Optional<User> login(String email, String password);
    Optional<User> findById(Long id);
    
    List<User> getAllUsers();
    void deleteUser(Long id);
}
