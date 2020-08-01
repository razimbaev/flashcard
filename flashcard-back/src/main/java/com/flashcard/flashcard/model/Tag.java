package com.flashcard.flashcard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity @Getter @Setter
@Table(name = "tag")
public class Tag {
    @Id
    private String tagName;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "tags")
    @JsonIgnore
    private Set<Card> cards;

    @Override
    public String toString() {
        return this.tagName;
    }
}
