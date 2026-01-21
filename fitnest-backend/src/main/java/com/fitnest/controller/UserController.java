package com.fitnest.controller;

import com.fitnest.model.User;
import com.fitnest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import com.fitnest.util.JwtUtil; // Import this
import java.util.Map; // Import this

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;
    
    @Autowired            // <--- 2. ADD THIS ANNOTATION
    private JwtUtil jwtUtil; // <--- 3. ADD THIS VARIABLE DECLARATION

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Default role is USER. 
            // To create an ADMIN, manually update the database role to 'ADMIN' after registration.
            user.setRole("USER");
            
            User saved = service.register(user);
            saved.setPassword(null); 
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> opt = service.login(user.getEmail(), user.getPassword());

        if (opt.isPresent()) {
            User u = opt.get();
            
            // Generate Token
            String token = jwtUtil.generateToken(u.getEmail(), u.getRole());
            
            // Create response map
            Map<String, Object> response = new HashMap<>();
            response.put("id", u.getId());
            response.put("name", u.getName());
            response.put("email", u.getEmail());
            response.put("role", u.getRole());
            response.put("token", token); // Send token
            
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> opt = service.findById(id);
        if (opt.isPresent()) {
            User u = opt.get();
            u.setPassword(null);
            return ResponseEntity.ok(u);
        }
        return ResponseEntity.notFound().build();
    }

    // --- Admin Endpoints ---

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = service.getAllUsers();
        users.forEach(u -> u.setPassword(null)); // Hide passwords
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> getUserCount() {
        List<User> users = service.getAllUsers();
        long userCount = users.stream().filter(u -> !"ADMIN".equals(u.getRole())).count();
        return ResponseEntity.ok(userCount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            service.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is working!");
    }
    
    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody User user) {
        try {
            user.setRole("ADMIN");
            User saved = service.register(user);
            saved.setPassword(null);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}