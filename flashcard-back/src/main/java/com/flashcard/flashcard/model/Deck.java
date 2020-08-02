package com.flashcard.flashcard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity @Getter @Setter
@Table(name = "deck")
public class Deck {
    @Id
    private String deckName;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "decks")
    @JsonIgnore
    private Set<Card> cards;

    @Override
    public String toString() {
        return this.deckName;
    }
}
