package com.fitnest.controller;

import com.fitnest.model.Profile;
import com.fitnest.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {
    @Autowired
    private ProfileService service;

    @PostMapping
    public ResponseEntity<Profile> create(@RequestBody Profile p) {
        return ResponseEntity.ok(service.create(p));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getByUser(@PathVariable Long userId) {
        Optional<Profile> opt = service.getByUserId(userId);
        return opt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Profile p) {
        try {
            return ResponseEntity.ok(service.update(id, p));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
