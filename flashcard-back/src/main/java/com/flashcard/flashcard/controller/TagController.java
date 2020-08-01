package com.flashcard.flashcard.controller;

import com.flashcard.flashcard.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/v1/tag")
public class TagController {
    @Autowired
    private TagRepository repository;

    @GetMapping
    public ResponseEntity<Set<String>> getAllTags() {
        return ResponseEntity.ok(repository.findDistinctTags());
    }
}
