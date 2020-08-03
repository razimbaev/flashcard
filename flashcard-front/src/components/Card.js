import React, { useState, useEffect } from "react";

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [transition, setTransition] = useState("quick-transition");

  useEffect(() => {
    setIsFlipped(false);
    setTransition("quick-transition");
  }, [card]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTransition("slow-transition");
  };

  const cardStyle =
    transition + (isFlipped ? " card flip-front" : " card flip-back");

  return (
    <div className="card-container">
      <div className={cardStyle} onClick={handleFlip}>
        <div className="card-front">
          <h1>{card.cardFront}</h1>
        </div>
        <div className="card-back">
          <h2>{card.cardBack}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;
