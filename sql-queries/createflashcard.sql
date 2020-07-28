DROP TABLE Tags;
DROP TABLE CardBackContent;
DROP TABLE FlashCard;

CREATE TABLE FlashCard(
	flashcard_id SERIAL PRIMARY KEY NOT NULL,
	card_front VARCHAR(200) NOT NULL,
	card_back VARCHAR(4000) NOT NULL
);

CREATE TABLE CardBackContent(
	flashcard_id INT,
	content_name VARCHAR(100) NOT NULL,
	content_data BYTEA NOT NULL,
	PRIMARY KEY(flashcard_id, content_name),
	CONSTRAINT flashId
		FOREIGN KEY(flashcard_id)
			REFERENCES FlashCard(flashcard_id)
);

CREATE TABLE Tags(
	flashcard_id INT,
	tag_name VARCHAR(100) NOT NULL,
	PRIMARY KEY(flashcard_id, tag_name),
	CONSTRAINT flashId
		FOREIGN KEY(flashcard_id)
			REFERENCES FlashCard(flashcard_id)
);