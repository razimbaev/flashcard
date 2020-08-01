import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ViewCardSettingsModal from "./ViewCardSettingsModal";

const Cards = () => {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [card, setCard] = useState({ cardFront: "", cardBack: "", tags: [] });
  const [cardNum, setCardNum] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/card")
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
    setShowBack(false);
  };

  const handleNext = () => {
    const newCardNum = cardNum + 1;
    setCardNum(newCardNum);
    setCard(filteredCards[newCardNum]);
    setShowBack(false);
  };

  const handleShowBack = () => {
    setShowBack(true);
  };

  const handleHideBack = () => {
    setShowBack(false);
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
        for (const tag of card.tags) {
          if (newFilters.includes(tag.tagName)) return true;
        }
        return false;
      });
      setFilteredCards(newFilteredCards);
      setCard(newFilteredCards[0]);
    }
    setCardNum(0);
  };

  const tags = card.tags.map((tag) => (
    <Badge id={tag.tagName} className="tag" variant="info">
      {tag.tagName}
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
      {
        <ViewCardSettingsModal
          show={showModal}
          handleClose={handleCloseModal}
          setFilters={handleFiltering}
        />
      }
      <br />
      <div className="tag-container">{tags}</div>
      <div className="view-card-components">
        <br />
        <Button
          variant="outline-primary"
          disabled={cardNum < 1}
          onClick={handlePrev}
        >
          Prev
        </Button>
        <h1 className="side-padding">{card.cardFront}</h1>
        <Button
          variant="outline-primary"
          disabled={cardNum > filteredCards.length - 2}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <br />
      <div className="view-card-components">
        {!showBack && (
          <Button variant="outline-secondary" onClick={handleShowBack}>
            Show Back
          </Button>
        )}
        {showBack && (
          <Button variant="outline-secondary" onClick={handleHideBack}>
            Hide Back
          </Button>
        )}
      </div>

      <br />
      <div className="view-card-components">
        {showBack && (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <div dangerouslySetInnerHTML={{ __html: card.cardBack }} />
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cards;
