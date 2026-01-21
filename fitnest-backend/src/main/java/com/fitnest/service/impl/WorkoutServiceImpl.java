package com.fitnest.service.impl;

import com.fitnest.model.Workout;
import com.fitnest.repository.WorkoutRepository;
import com.fitnest.service.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutServiceImpl implements WorkoutService {
    @Autowired
    private WorkoutRepository repo;

    @Override
    public Workout create(Workout w) {
        return repo.save(w);
    }

    @Override
    public List<Workout> listAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Workout> getById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Workout update(Long id, Workout w) {
        Optional<Workout> opt = repo.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("Workout not found");
        Workout ex = opt.get();
        ex.setTitle(w.getTitle());
        ex.setDescription(w.getDescription());
        ex.setDurationMinutes(w.getDurationMinutes());
        ex.setDifficulty(w.getDifficulty());
        return repo.save(ex);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
