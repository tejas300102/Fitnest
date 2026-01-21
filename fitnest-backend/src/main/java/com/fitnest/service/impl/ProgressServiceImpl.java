package com.fitnest.service.impl;

import com.fitnest.model.Progress;
import com.fitnest.repository.ProgressRepository;
import com.fitnest.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressServiceImpl implements ProgressService {

    @Autowired
    private ProgressRepository repo;

    @Override
    public Progress create(Progress p) {
        return repo.save(p);
    }

    @Override
    public List<Progress> listAll() {
        return repo.findAll();
    }

    @Override
    public List<Progress> listByUser(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Optional<Progress> getById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Progress update(Long id, Progress p) {
        Progress existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        existing.setDate(p.getDate());
        existing.setWeight(p.getWeight());
        existing.setBodyFatPercent(p.getBodyFatPercent());
        existing.setNotes(p.getNotes());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
