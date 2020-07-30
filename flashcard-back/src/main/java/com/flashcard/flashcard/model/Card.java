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

    @ElementCollection
    @CollectionTable(name = "tags", joinColumns = {@JoinColumn(name = "flashcard_id")})
    @Column(name = "tag_name")
    private Set<String> tags;
}
