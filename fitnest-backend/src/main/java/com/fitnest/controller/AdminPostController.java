package com.fitnest.controller;

import com.fitnest.model.AdminPost;
import com.fitnest.service.AdminPostService;
import com.fitnest.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/posts")
public class AdminPostController {
    
    @Autowired
    private AdminPostService adminPostService;
    
    @Autowired
    private NotificationService notificationService;
    
    @PostMapping
    public ResponseEntity<AdminPost> createPost(@RequestBody AdminPost post) {
        AdminPost savedPost = adminPostService.createPost(post);
        
        // Create notifications for all users
        String notificationTitle = getNotificationTitle(post.getType());
        String notificationMessage = post.getTitle();
        notificationService.createNotificationsForAllUsers(
            savedPost.getId(), 
            notificationTitle, 
            notificationMessage
        );
        
        return ResponseEntity.ok(savedPost);
    }
    
    @GetMapping
    public ResponseEntity<List<AdminPost>> getAllPosts() {
        return ResponseEntity.ok(adminPostService.getAllPosts());
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<AdminPost>> getPostsByType(@PathVariable AdminPost.PostType type) {
        return ResponseEntity.ok(adminPostService.getPostsByType(type));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        adminPostService.deletePost(id);
        return ResponseEntity.ok().build();
    }
    
    private String getNotificationTitle(AdminPost.PostType type) {
        switch (type) {
            case QUOTE: return "New Motivational Quote";
            case WORKOUT: return "New Workout Session";
            case DIET_TIP: return "New Diet Tip";
            case EVENT: return "Upcoming Event";
            default: return "New Update";
        }
    }
}