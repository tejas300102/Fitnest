package com.fitnest.service;

import com.fitnest.model.Workout;

import java.util.List;
import java.util.Optional;

public interface WorkoutService {
    Workout create(Workout w);
    List<Workout> listAll();
    Optional<Workout> getById(Long id);
    Workout update(Long id, Workout w);
    void delete(Long id);
}

