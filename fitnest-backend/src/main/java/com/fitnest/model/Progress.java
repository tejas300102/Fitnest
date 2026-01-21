package com.fitnest.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "progress")
public class Progress {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId; // link to user (simple reference)
    private LocalDate date;
    private Double weight; // kg
    private Double bodyFatPercent;
    private String notes;
}
