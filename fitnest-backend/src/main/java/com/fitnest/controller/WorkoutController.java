package com.fitnest.controller;

import com.fitnest.model.Workout;
import com.fitnest.service.WorkoutService;
import com.fitnest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {
    @Autowired
    private WorkoutService service;
    
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Workout> create(@RequestBody Workout w) {
        System.out.println("Creating workout with userId: " + w.getUserId());
        return ResponseEntity.ok(service.create(w));
    }

    @GetMapping
    public ResponseEntity<List<Workout>> list() {
        List<Workout> workouts = service.listAll();
        // Populate user names
        workouts.forEach(workout -> {
            if (workout.getUserId() != null) {
                userService.findById(workout.getUserId())
                    .ifPresent(user -> workout.setUserName(user.getName()));
            } else {
                workout.setUserName("System");
            }
        });
        return ResponseEntity.ok(workouts);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Workout>> getUserWorkouts(@PathVariable Long userId) {
        List<Workout> workouts = service.listAll().stream()
            .filter(w -> userId.equals(w.getUserId()))
            .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(workouts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Workout w) {
        try {
            return ResponseEntity.ok(service.update(id, w));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}

