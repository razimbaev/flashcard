package com.flashcard.flashcard.controller;

import com.flashcard.flashcard.model.Card;
import com.flashcard.flashcard.repository.CardRepository;
import com.flashcard.flashcard.repository.DeckRepository;
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
    private DeckRepository deckRepository;

    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card card) {
        deckRepository.saveAll(card.getDecks());
        card = cardRepository.save(card);
        return ResponseEntity.ok(card);
    }

    @PutMapping
    @RequestMapping("/{cardFront}")
    public ResponseEntity<Card> updateCard(@PathVariable(value="cardFront") String cardFront, @RequestBody Card updatedCard) {
        deckRepository.saveAll(updatedCard.getDecks());

        Card beforeUpdate = cardRepository.findByCardFront(cardFront);
        updatedCard.setFlashcardId(beforeUpdate.getFlashcardId());

        updatedCard = cardRepository.save(updatedCard);
        return ResponseEntity.ok(updatedCard);
    }

    @GetMapping
    public ResponseEntity<Iterable<Card>> getAllCards() {
        return ResponseEntity.ok(cardRepository.findAllOrdered());
    }

}
