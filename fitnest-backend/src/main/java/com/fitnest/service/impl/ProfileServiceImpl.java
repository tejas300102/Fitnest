package com.fitnest.service.impl;

import com.fitnest.model.Profile;
import com.fitnest.repository.ProfileRepository;
import com.fitnest.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository repo;

    @Override
    public Profile create(Profile p) {
        // Check if a profile already exists for this user
        Optional<Profile> existing = repo.findByUserId(p.getUserId());

        if (existing.isPresent()) {
            // Update existing profile instead of creating new
            Profile ex = existing.get();
            ex.setAge(p.getAge());
            ex.setHeight(p.getHeight());
            ex.setWeight(p.getWeight());
            ex.setGender(p.getGender());
            ex.setGoals(p.getGoals());
            return repo.save(ex);
        }

        // Else create a new profile
        return repo.save(p);
    }


    @Override
    public Optional<Profile> getByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Profile update(Long id, Profile p) {
        Optional<Profile> opt = repo.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("Profile not found");
        Profile ex = opt.get();
        ex.setAge(p.getAge());
        ex.setHeight(p.getHeight());
        ex.setWeight(p.getWeight());
        ex.setGender(p.getGender());
        ex.setGoals(p.getGoals());
        return repo.save(ex);
    }
}
