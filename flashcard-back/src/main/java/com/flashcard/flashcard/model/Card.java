package com.flashcard.flashcard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity @Getter @Setter @ToString
@Table(name = "flashcard")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    @JsonIgnore
    private long flashcardId;
    private String cardFront;
    private String cardBack;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "flashcard_deck",
            joinColumns = @JoinColumn(name = "flashcard_id"),
            inverseJoinColumns = @JoinColumn(name = "deck_name")
    )
    private Set<Deck> decks;
}
