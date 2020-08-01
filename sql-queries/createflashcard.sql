DROP TABLE Flashcard_Tag
DROP TABLE Tag;
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

CREATE TABLE Tag(
	tag_name VARCHAR(100) PRIMARY KEY NOT NULL
);

CREATE TABLE Flashcard_Tag(
	flashcard_id INT,
	tag_name VARCHAR(100) NOT NULL,
	PRIMARY KEY(flashcard_id, tag_name),
	CONSTRAINT flashcard_id_FK
		FOREIGN KEY(flashcard_id)
			REFERENCES FlashCard(flashcard_id),
	CONSTRAINT tag_name_FK
		FOREIGN KEY(tag_name)
			REFERENCES Tag(tag_name)
);

GRANT ALL ON SEQUENCE public.flashcard_flashcard_id_seq TO flashcard_user;

GRANT ALL ON TABLE public.cardbackcontent TO flashcard_user;

GRANT ALL ON TABLE public.flashcard TO flashcard_user;

GRANT ALL ON TABLE public.tag TO flashcard_user;

GRANT ALL ON TABLE public.flashcard_tag TO flashcard_user;