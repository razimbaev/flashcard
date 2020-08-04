package com.flashcard.flashcard.repository;

import com.flashcard.flashcard.model.Card;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardRepository extends CrudRepository<Card, Integer> {
    @Query(value = "SELECT * FROM flashcard ORDER BY flashcard_id", nativeQuery = true)
    List<Card> findAllOrdered();

    Card findByCardFront(String cardFront);
}
