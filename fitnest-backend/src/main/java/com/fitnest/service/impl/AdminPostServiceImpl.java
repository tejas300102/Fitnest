package com.fitnest.service.impl;

import com.fitnest.model.AdminPost;
import com.fitnest.repository.AdminPostRepository;
import com.fitnest.service.AdminPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminPostServiceImpl implements AdminPostService {
    
    @Autowired
    private AdminPostRepository repository;
    
    @Override
    public AdminPost createPost(AdminPost post) {
        return repository.save(post);
    }
    
    @Override
    public List<AdminPost> getAllPosts() {
        return repository.findByOrderByCreatedAtDesc();
    }
    
    @Override
    public List<AdminPost> getPostsByType(AdminPost.PostType type) {
        return repository.findByTypeOrderByCreatedAtDesc(type);
    }
    
    @Override
    public void deletePost(Long id) {
        repository.deleteById(id);
    }
}