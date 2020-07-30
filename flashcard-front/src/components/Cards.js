import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({ cardFront: "", cardBack: "", tags: [] });
  const [cardNum, setCardNum] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/card")
      .then((result) => {
        setCards(result.data);
        if (result.data.length > 0) setCard(result.data[0]);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  const handlePrev = () => {
    const newCardNum = cardNum - 1;
    setCardNum(newCardNum);
    setCard(cards[newCardNum]);
    setShowBack(false);
  };

  const handleNext = () => {
    const newCardNum = cardNum + 1;
    setCardNum(newCardNum);
    setCard(cards[newCardNum]);
    setShowBack(false);
  };

  const handleShowBack = () => {
    setShowBack(true);
  };

  const handleHideBack = () => {
    setShowBack(false);
  };

  const tags = card.tags.map((tag) => (
    <Badge className="tag" variant="info">
      {tag}
    </Badge>
  ));

  return (
    <div>
      <div className="tag-container">{tags}</div>
      <div className="view-card-components">
        <br />
        <Button variant="primary" disabled={cardNum < 1} onClick={handlePrev}>
          Prev
        </Button>
        <h1 className="side-padding">{card.cardFront}</h1>
        <Button
          variant="primary"
          disabled={cardNum > cards.length - 2}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
      <br />
      <div className="view-card-components">
        {!showBack && (
          <Button variant="secondary" onClick={handleShowBack}>
            Show Back
          </Button>
        )}
        {showBack && (
          <Button variant="secondary" onClick={handleHideBack}>
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
