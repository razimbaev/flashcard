package com.flashcard.flashcard.repository;

import com.flashcard.flashcard.model.Deck;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface DeckRepository extends CrudRepository<Deck, String> {
    @Query(value = "SELECT DISTINCT deck_name FROM deck", nativeQuery = true)
    public Set<String> findAllDeckNames();

}
