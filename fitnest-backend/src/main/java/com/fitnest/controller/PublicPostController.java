package com.fitnest.controller;

import com.fitnest.model.AdminPost;
import com.fitnest.service.AdminPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173") // <--- ADD THIS LINE
public class PublicPostController {
    
    @Autowired
    private AdminPostService adminPostService;
    
    @GetMapping
    public ResponseEntity<List<AdminPost>> getPublicPosts() {
        return ResponseEntity.ok(adminPostService.getAllPosts());
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<AdminPost>> getPublicPostsByType(@PathVariable AdminPost.PostType type) {
        return ResponseEntity.ok(adminPostService.getPostsByType(type));
    }
}