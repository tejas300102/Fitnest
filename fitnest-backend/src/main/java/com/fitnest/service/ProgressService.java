package com.fitnest.service;

import com.fitnest.model.Progress;

import java.util.List;
import java.util.Optional;

public interface ProgressService {
    Progress create(Progress p);
    List<Progress> listAll();
    List<Progress> listByUser(Long userId);
    Optional<Progress> getById(Long id);
    Progress update(Long id, Progress p);
    void delete(Long id);
}
