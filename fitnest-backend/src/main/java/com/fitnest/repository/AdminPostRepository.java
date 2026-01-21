package com.fitnest.repository;

import com.fitnest.model.AdminPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AdminPostRepository extends JpaRepository<AdminPost, Long> {
    List<AdminPost> findByOrderByCreatedAtDesc();
    List<AdminPost> findByTypeOrderByCreatedAtDesc(AdminPost.PostType type);
}