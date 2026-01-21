package com.fitnest.service;

import com.fitnest.model.Diet;

import java.util.List;
import java.util.Optional;

public interface DietService {
    Diet create(Diet d);
    List<Diet> listAll();
    Optional<Diet> getById(Long id);
    Diet update(Long id, Diet d);
    void delete(Long id);
}

