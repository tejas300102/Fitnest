package com.fitnest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "diets")
public class Diet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mealType; // Breakfast/Lunch/Dinner/Snack
    private String calories; // optional string or integer
    private String description;
    private Long userId; // User who created this diet
    
    @Transient
    private String userName; // For display purposes
}

