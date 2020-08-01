package com.flashcard.flashcard.controller;

import com.flashcard.flashcard.model.Card;
import com.flashcard.flashcard.repository.CardRepository;
import com.flashcard.flashcard.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/card")
public class CardController {
    private static final Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        tagRepository.saveAll(card.getTags());
        card = cardRepository.save(card);
        return ResponseEntity.ok(card);
    }

    @GetMapping
    public ResponseEntity<Iterable<Card>> getAllCards() {
        return ResponseEntity.ok(cardRepository.findAll());
    }

}
