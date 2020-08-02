DROP TABLE Flashcard_Deck;
DROP TABLE Deck;
DROP TABLE CardBackContent;
DROP TABLE Flashcard;

CREATE TABLE Flashcard(
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

CREATE TABLE Deck(
	deck_name VARCHAR(100) PRIMARY KEY NOT NULL
);

CREATE TABLE Flashcard_Deck(
	flashcard_id INT,
	deck_name VARCHAR(100) NOT NULL,
	PRIMARY KEY(flashcard_id, deck_name),
	CONSTRAINT flashcard_id_FK
		FOREIGN KEY(flashcard_id)
			REFERENCES FlashCard(flashcard_id),
	CONSTRAINT deck_name_FK
		FOREIGN KEY(deck_name)
			REFERENCES Deck(deck_name)
);

GRANT ALL ON SEQUENCE public.flashcard_flashcard_id_seq TO flashcard_user;

GRANT ALL ON TABLE public.cardbackcontent TO flashcard_user;

GRANT ALL ON TABLE public.flashcard TO flashcard_user;

GRANT ALL ON TABLE public.deck TO flashcard_user;

GRANT ALL ON TABLE public.flashcard_deck TO flashcard_user;