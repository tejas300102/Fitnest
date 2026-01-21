package com.fitnest.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "admin_posts")
public class AdminPost {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private PostType type;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    private Long adminId;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public enum PostType {
        QUOTE, WORKOUT, DIET_TIP, EVENT
    }
}