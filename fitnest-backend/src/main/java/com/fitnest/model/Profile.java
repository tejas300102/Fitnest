package com.fitnest.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profiles")
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Integer age;
    private Double height; // cm
    private Double weight; // kg
    private String gender;
    private String goals; // e.g., "Lose weight"
}
