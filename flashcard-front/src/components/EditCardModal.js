import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import CardForm from "./CardForm";
import * as service from "./service";

const EditCardModal = ({ originalCard }) => {
  const [showModal, setShowModal] = useState(false);
  const [card, setCard] = useState({ front: "", back: "" });
  const [decks, setDecks] = useState([]);

  const handleOpenModal = () => {
    if (originalCard) {
      setCard({ front: originalCard.cardFront, back: originalCard.cardBack });
      const decksTransformed = originalCard.decks.map((deck) => {
        return { label: deck.deckName, value: deck.deckName };
      });
      setDecks(decksTransformed);
    } else {
      setCard({ front: "", back: "" });
      setDecks([]);
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        variant="outline-primary"
        disabled={!originalCard || !originalCard.cardFront}
        onClick={handleOpenModal}
        className="side-padding"
      >
        Edit Card
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardForm
            card={card}
            setCard={setCard}
            serviceCall={service.updateCard}
            isCreate={false}
            originalDecks={decks}
            originalCardFront={originalCard.cardFront}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditCardModal;
