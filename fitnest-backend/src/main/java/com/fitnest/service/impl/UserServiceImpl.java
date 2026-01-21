package com.fitnest.service.impl;

import com.fitnest.model.User;
import com.fitnest.repository.UserRepository;
import com.fitnest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the encoder

    @Override
    public User register(User user) {
        // Validate required fields
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password is required");
        }
        if (user.getPhone() == null || user.getPhone().trim().isEmpty()) {
            throw new RuntimeException("Phone is required");
        }
        
        User existing = repo.findByEmail(user.getEmail());
        if (existing != null) {
            throw new RuntimeException("Email already registered");
        }

        // --- HASH PASSWORD HERE ---
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        // --------------------------

        return repo.save(user);
    }

    @Override
    public Optional<User> login(String email, String rawPassword) {
        User u = repo.findByEmail(email);
        
        // --- VERIFY HASH HERE ---
        // We use passwordEncoder.matches(raw, hashed)
        if (u != null && passwordEncoder.matches(rawPassword, u.getPassword())) {
            return Optional.of(u);
        }
        // ------------------------
        
        return Optional.empty();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    // --- Admin Implementations ---

    @Override
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
}