package com.fitnest.service;

import com.fitnest.model.Profile;

import java.util.Optional;

public interface ProfileService {
    Profile create(Profile p);
    Optional<Profile> getByUserId(Long userId);
    Profile update(Long id, Profile p);
}
