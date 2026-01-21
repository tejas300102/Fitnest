package com.fitnest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuoteController {

    private final List<Map<String, String>> quotes = new ArrayList<>();
    private final Random random = new Random();

    public QuoteController() {
        // --- 30+ Motivational Quotes ---
        addQuote("The only bad workout is the one that didn't happen.", "Unknown");
        addQuote("Exercise is king. Nutrition is queen. Put them together and you've got a kingdom.", "Jack LaLanne");
        addQuote("Motivation is what gets you started. Habit is what keeps you going.", "Jim Ryun");
        addQuote("To enjoy the glow of good health, you must exercise.", "Gene Tunney");
        addQuote("Fitness is not about being better than someone else. It’s about being better than you were yesterday.", "Khloe Kardashian");
        addQuote("Take care of your body. It's the only place you have to live.", "Jim Rohn");
        addQuote("Pain is temporary. Quitting lasts forever.", "Lance Armstrong");
        addQuote("The difference between the impossible and the possible lies in a person's determination.", "Tommy Lasorda");
        addQuote("Don't count the days, make the days count.", "Muhammad Ali");
        addQuote("It never gets easier, you just get better.", "Unknown");
        
        // New Additions
        addQuote("If you want something you've never had, you must be willing to do something you've never done.", "Thomas Jefferson");
        addQuote("The body achieves what the mind believes.", "Napoleon Hill");
        addQuote("Dead last finish is greater than did not finish, which trumps did not start.", "Unknown");
        addQuote("What hurts today makes you stronger tomorrow.", "Jay Cutler");
        addQuote("Success usually comes to those who are too busy to be looking for it.", "Henry David Thoreau");
        addQuote("All progress takes place outside the comfort zone.", "Michael John Bobak");
        addQuote("If you think lifting is dangerous, try being weak. Being weak is dangerous.", "Bret Contreras");
        addQuote("The clock is ticking. Are you becoming the person you want to be?", "Greg Plitt");
        addQuote("Action is the foundational key to all success.", "Pablo Picasso");
        addQuote("Things may come to those who wait, but only the things left by those who hustle.", "Abraham Lincoln");
        addQuote("Well done is better than well said.", "Benjamin Franklin");
        addQuote("A one-hour workout is only 4% of your day. No excuses.", "Unknown");
        addQuote("Your body can stand almost anything. It’s your mind that you have to convince.", "Unknown");
        addQuote("Sweat is fat crying.", "Unknown");
        addQuote("Discipline is doing what needs to be done, even if you don't want to do it.", "Unknown");
        addQuote("Strength does not come from physical capacity. It comes from an indomitable will.", "Mahatma Gandhi");
        addQuote("Do something today that your future self will thank you for.", "Sean Patrick Flanery");
        addQuote("Rome wasn't built in a day, but they worked on it every single day.", "Unknown");
        addQuote("You don't have to be great to start, but you have to start to be great.", "Zig Ziglar");
        addQuote("We are what we repeatedly do. Excellence then is not an act but a habit.", "Aristotle");
        addQuote("If it doesn't challenge you, it won't change you.", "Fred DeVito");
        addQuote("Don't stop when you're tired. Stop when you're done.", "David Goggins");
    }

    private void addQuote(String text, String author) {
        Map<String, String> quote = new HashMap<>();
        quote.put("text", text);
        quote.put("author", author);
        quotes.add(quote);
    }

    @GetMapping("/random")
    public ResponseEntity<Map<String, String>> getRandomQuote() {
        int index = random.nextInt(quotes.size());
        return ResponseEntity.ok(quotes.get(index));
    }
}