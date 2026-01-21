package com.fitnest.service;

import com.fitnest.model.AdminPost;
import java.util.List;

public interface AdminPostService {
    AdminPost createPost(AdminPost post);
    List<AdminPost> getAllPosts();
    List<AdminPost> getPostsByType(AdminPost.PostType type);
    void deletePost(Long id);
}