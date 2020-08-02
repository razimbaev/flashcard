package com.flashcard.flashcard.controller;

import com.flashcard.flashcard.repository.DeckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/v1/deck")
public class DeckController {
    @Autowired
    private DeckRepository repository;

    @GetMapping
    public ResponseEntity<Set<String>> getAllDeckNames() {
        return ResponseEntity.ok(repository.findAllDeckNames());
    }
}
