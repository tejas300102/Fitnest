package com.fitnest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "workouts")
public class Workout {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Integer durationMinutes; // duration in minutes
    private String difficulty; // e.g., Easy/Medium/Hard
    private Long userId; // User who created this workout
    
    @Transient
    private String userName; // For display purposes
}
