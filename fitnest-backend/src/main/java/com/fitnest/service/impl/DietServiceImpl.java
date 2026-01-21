package com.fitnest.service.impl;

import com.fitnest.model.Diet;
import com.fitnest.repository.DietRepository;
import com.fitnest.service.DietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DietServiceImpl implements DietService {
    @Autowired
    private DietRepository repo;

    @Override
    public Diet create(Diet d) {
        return repo.save(d);
    }

    @Override
    public List<Diet> listAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Diet> getById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Diet update(Long id, Diet d) {
        Optional<Diet> opt = repo.findById(id);
        if (opt.isEmpty()) throw new RuntimeException("Diet not found");
        Diet ex = opt.get();
        ex.setName(d.getName());
        ex.setMealType(d.getMealType());
        ex.setCalories(d.getCalories());
        ex.setDescription(d.getDescription());
        return repo.save(ex);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}

