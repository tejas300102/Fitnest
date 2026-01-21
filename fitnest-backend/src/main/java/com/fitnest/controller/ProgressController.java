//package com.fitnest.controller;
//
//import com.fitnest.model.Progress;
//import com.fitnest.service.ProgressService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/progress")
//@CrossOrigin(origins = "http://localhost:5173")
//public class ProgressController {
//    @Autowired
//    private ProgressService service;
//
//    @PostMapping
//    public ResponseEntity<Progress> create(@RequestBody Progress p) {
//        return ResponseEntity.ok(service.create(p));
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Progress>> list() {
//        return ResponseEntity.ok(service.listAll());
//    }
//
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Progress>> listByUser(@PathVariable Long userId) {
//        return ResponseEntity.ok(service.listByUser(userId));
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> get(@PathVariable Long id) {
//        return service.getById(id)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Progress p) {
//        try {
//            return ResponseEntity.ok(service.update(id, p));
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable Long id) {
//        service.delete(id);
//        return ResponseEntity.ok().build();
//    }
//}


package com.fitnest.controller;

import com.fitnest.model.Progress;
import com.fitnest.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/progress")
// FIX: Update CORS to allow frontend requests
@CrossOrigin(origins = "http://localhost:5173")
public class ProgressController {
    @Autowired
    private ProgressService service;

    @PostMapping
    public ResponseEntity<Progress> create(@RequestBody Progress p) {
        return ResponseEntity.ok(service.create(p));
    }

    @GetMapping
    public ResponseEntity<List<Progress>> list() {
        return ResponseEntity.ok(service.listAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Progress>> listByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(service.listByUser(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Progress p) {
        try {
            return ResponseEntity.ok(service.update(id, p));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}