import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import StudySettingsModal from "./StudySettingsModal";
import * as service from "./service";
import Card from "./Card";

const Cards = () => {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [card, setCard] = useState({ cardFront: "", cardBack: "", decks: [] });
  const [cardNum, setCardNum] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    service
      .getAllCards()
      .then((result) => {
        setAllCards(result.data);
        setFilteredCards(result.data);
        if (result.data.length > 0) setCard(result.data[0]);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  const handlePrev = () => {
    const newCardNum = cardNum - 1;
    setCardNum(newCardNum);
    setCard(filteredCards[newCardNum]);
  };

  const handleNext = () => {
    const newCardNum = cardNum + 1;
    setCardNum(newCardNum);
    setCard(filteredCards[newCardNum]);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFiltering = (newFilters) => {
    if (newFilters && newFilters.length < 1) {
      setFilteredCards(allCards);
      setCard(allCards[0]);
    } else {
      newFilters = newFilters.map((filter) => filter.value);
      const newFilteredCards = allCards.filter((card) => {
        for (const deck of card.decks) {
          if (newFilters.includes(deck.deckName)) return true;
        }
        return false;
      });
      setFilteredCards(newFilteredCards);
      setCard(newFilteredCards[0]);
    }
    setCardNum(0);
  };

  const decks = card.decks.map((deck) => (
    <Badge id={deck.deckName} className="deck" variant="info">
      {deck.deckName}
    </Badge>
  ));

  return (
    <div>
      <Button
        className="filter-button-placement"
        variant="primary"
        onClick={handleOpenModal}
      >
        Filters
      </Button>

      <StudySettingsModal
        show={showModal}
        handleClose={handleCloseModal}
        setFilters={handleFiltering}
      />

      <br />
      <div className="deck-container">{decks}</div>
      <div className="view-card-components">
        <br />
        <Button
          variant="outline-primary"
          disabled={cardNum < 1}
          onClick={handlePrev}
          className="side-padding"
        >
          Prev
        </Button>
        <Card card={card} />
        <Button
          variant="outline-primary"
          disabled={cardNum > filteredCards.length - 2}
          onClick={handleNext}
          className="side-padding"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Cards;
