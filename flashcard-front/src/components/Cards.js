import React, { useEffect, useState } from "react";
import axios from "axios";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({ cardFront: "", cardBack: "" });
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
    setCardNum(cardNum - 1);
    setCard(cards[cardNum]);
    setShowBack(false);
  };

  const handleNext = () => {
    setCardNum(cardNum + 1);
    setCard(cards[cardNum]);
    setShowBack(false);
  };

  const handleShowBack = () => {
    setShowBack(true);
  };

  const handleHideBack = () => {
    setShowBack(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button disabled={cardNum < 1} onClick={handlePrev}>
          Prev
        </button>
        {card.cardFront}
        <button disabled={cardNum > cards.length - 2} onClick={handleNext}>
          Next
        </button>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {!showBack && <button onClick={handleShowBack}>Show Back</button>}
        {showBack && <button onClick={handleHideBack}>Hide Back</button>}
      </div>

      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        {showBack && (
          <div dangerouslySetInnerHTML={{ __html: card.cardBack }} />
        )}
      </div>
    </div>
  );
};

export default Cards;
