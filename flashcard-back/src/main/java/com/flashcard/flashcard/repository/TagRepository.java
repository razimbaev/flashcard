package com.flashcard.flashcard.repository;

import com.flashcard.flashcard.model.Tag;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface TagRepository extends CrudRepository<Tag, String> {
    @Query(value = "SELECT DISTINCT tag_name FROM tag", nativeQuery = true)
    public Set<String> findDistinctTags();

}
