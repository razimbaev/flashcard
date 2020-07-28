package com.flashcard.flashcard.controller;

import com.flashcard.flashcard.model.Card;
import com.flashcard.flashcard.repository.CardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/card")
public class CardController {
    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private CardRepository repository;

    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        card = repository.save(card);
        return ResponseEntity.ok(card);
    }

    @GetMapping
    public ResponseEntity<Iterable<Card>> test() {
        return ResponseEntity.ok(repository.findAll());
    }

}
