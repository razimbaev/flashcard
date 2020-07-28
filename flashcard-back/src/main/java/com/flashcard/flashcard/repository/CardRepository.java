package com.flashcard.flashcard.repository;

import com.flashcard.flashcard.model.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Integer> {

}
