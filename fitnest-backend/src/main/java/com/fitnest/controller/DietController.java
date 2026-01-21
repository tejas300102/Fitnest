package com.fitnest.controller;

import com.fitnest.model.Diet;
import com.fitnest.service.DietService;
import com.fitnest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/diets")
public class DietController {

    @Autowired
    private DietService service;
    
    @Autowired
    private UserService userService;

    private final WebClient webClient;

    // Constructor: Initialize WebClient for Edamam API
    public DietController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.edamam.com/api/nutrition-data").build();
    }


    @PostMapping
    public ResponseEntity<Diet> create(@RequestBody Diet d) {
        System.out.println("Creating diet with userId: " + d.getUserId());
        return ResponseEntity.ok(service.create(d));
    }

    @GetMapping
    public ResponseEntity<List<Diet>> list() {
        List<Diet> diets = service.listAll();
        // Populate user names
        diets.forEach(diet -> {
            if (diet.getUserId() != null) {
                userService.findById(diet.getUserId())
                    .ifPresent(user -> diet.setUserName(user.getName()));
            } else {
                diet.setUserName("System");
            }
        });
        return ResponseEntity.ok(diets);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Diet>> getUserDiets(@PathVariable Long userId) {
        List<Diet> diets = service.listAll().stream()
            .filter(d -> userId.equals(d.getUserId()))
            .collect(java.util.stream.Collectors.toList());
        return ResponseEntity.ok(diets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Diet d) {
        try {
            return ResponseEntity.ok(service.update(id, d));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/nutrition/{foodName}")
    public ResponseEntity<?> getNutrition(@PathVariable String foodName) {
        
        // ⚠️ REPLACE THESE WITH YOUR ACTUAL KEYS
        String appId = "bddd9bc9"; 
        String appKey = "5b2d181593152cbeee41674e0203793a"; 

        try {
            System.out.println("Searching for: " + foodName);
            String encodedFood = URLEncoder.encode(foodName, StandardCharsets.UTF_8);

            Map response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("app_id", appId)
                            .queryParam("app_key", appKey)
                            .queryParam("ingr", encodedFood) 
                            .build())
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            System.out.println("Edamam Raw Response: " + response);

            // 1. Try to find nutrients at ROOT level (Standard) or NESTED level (Your case)
            Map<String, Object> nutrients = extractNutrients(response);

            if (nutrients != null && !nutrients.isEmpty()) {
                Map<String, Object> simplified = new HashMap<>();
                
                // Extract Calories (Try root first, then nested ENERC_KCAL)
                if (response.containsKey("calories") && response.get("calories") instanceof Number) {
                     simplified.put("Calories", response.get("calories") + " kcal");
                } else {
                     // Fallback: extract from nutrients map if root calories is missing
                     simplified.put("Calories", getNutrientString(nutrients, "ENERC_KCAL"));
                }

                // Extract Macros
                simplified.put("Protein", getNutrientString(nutrients, "PROCNT"));
                simplified.put("Fat", getNutrientString(nutrients, "FAT"));
                simplified.put("Carbs", getNutrientString(nutrients, "CHOCDF"));
                simplified.put("Fiber", getNutrientString(nutrients, "FIBTG"));

                return ResponseEntity.ok(simplified);
            }

            return ResponseEntity.ok(Map.of("Message", "Food not found. Try '1 cup rice' or '100g chicken'"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // Helper logic to find the nutrient map wherever it is hiding
    private Map<String, Object> extractNutrients(Map response) {
        if (response == null) return null;

        // Plan A: Check Root Level (Standard API response)
        if (response.containsKey("totalNutrients")) {
            return (Map<String, Object>) response.get("totalNutrients");
        }

        // Plan B: Check Nested Level (Ingredients -> Parsed -> Nutrients)
        if (response.containsKey("ingredients")) {
            List ingredients = (List) response.get("ingredients");
            if (!ingredients.isEmpty()) {
                Map firstIng = (Map) ingredients.get(0);
                if (firstIng.containsKey("parsed")) {
                    List parsed = (List) firstIng.get("parsed");
                    if (!parsed.isEmpty()) {
                        Map firstParsed = (Map) parsed.get(0);
                        if (firstParsed.containsKey("nutrients")) {
                            return (Map<String, Object>) firstParsed.get("nutrients");
                        }
                    }
                }
            }
        }
        return null;
    }

    private String getNutrientString(Map<String, Object> nutrients, String code) {
        if (nutrients != null && nutrients.containsKey(code)) {
            Map<String, Object> data = (Map<String, Object>) nutrients.get(code);
            double qty = 0.0;
            String unit = "";
            
            if (data.get("quantity") instanceof Number) {
                qty = ((Number) data.get("quantity")).doubleValue();
            }
            if (data.get("unit") instanceof String) {
                unit = (String) data.get("unit");
            }
            
            // Special case for Calories to format nicely
            if (code.equals("ENERC_KCAL")) {
                return String.format("%.0f %s", qty, "kcal");
            }
            
            return String.format("%.1f %s", qty, unit);
        }
        return "0 g";
    }
}