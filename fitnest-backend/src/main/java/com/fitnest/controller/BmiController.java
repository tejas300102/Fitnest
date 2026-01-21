package com.fitnest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/bmi")
// FIX 1: Allow requests from your Vite frontend port
@CrossOrigin(origins = "http://localhost:5173")
public class BmiController {

    @GetMapping
    public ResponseEntity<?> calculate(@RequestParam double weightKg, @RequestParam double heightCm) {
        if (heightCm <= 0 || weightKg <= 0) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        double heightM = heightCm / 100.0;
        double bmi = weightKg / (heightM * heightM);

        // FIX 2: Calculate status string for the frontend
        String status;
        if (bmi < 18.5) status = "Underweight";
        else if (bmi < 25) status = "Normal weight";
        else if (bmi < 30) status = "Overweight";
        else status = "Obese";

        // FIX 3: Return a JSON object instead of a raw number
        // This matches the frontend's expectation of response.data.bmi and response.data.status
        Map<String, Object> response = new HashMap<>();
        response.put("bmi", bmi);
        response.put("status", status);

        return ResponseEntity.ok(response);
    }
}