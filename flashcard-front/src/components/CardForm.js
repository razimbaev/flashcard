import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import * as service from "./service";

const CardForm = ({
  card,
  setCard,
  isCreate,
  originalDecks,
  originalCardFront,
}) => {
  const [decks, setDecks] = useState([]);
  const [deckOptions, setDeckOptions] = useState([]);

  useEffect(() => {
    if (originalDecks) {
      setDecks(originalDecks);
    }
  }, [originalDecks]);

  useEffect(() => {
    service
      .getAllDecks()
      .then((result) => {
        const allDeckOptions = result.data.map((deck) => {
          return { value: deck, label: deck };
        });
        setDeckOptions(allDeckOptions);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleChangeDecks = (decksForCard) => {
    setDecks(decksForCard);
  };

  const handleSubmit = (event) => {
    if (card.front && card.back) {
      const deckNames = decks.map((deck) => {
        return { deckName: deck.value };
      });

      const onSuccess = (result) => {
        alert(JSON.stringify(result));
      };

      const onError = onSuccess;

      if (isCreate) {
        service
          .createNewCard(card.front, card.back, deckNames)
          .then(onSuccess)
          .catch(onError);
      } else {
        service
          .updateCard(card.front, card.back, deckNames, originalCardFront)
          .then(onSuccess)
          .catch(onError);
      }
    }
    event.preventDefault();
  };

  const deckSelectCustomStyling = {
    multiValueLabel: (provided, state) => {
      if (state.data.__isNew__)
        return { ...provided, color: "green", fontWeight: "bold" };

      return provided;
    },
  };

  return (
    <div className="side-padding">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFront">
          <Form.Label>Front</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. One"
            name="front"
            value={card.front}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formBack">
          <Form.Label>Back</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="e.g. <h1>Uno</h1>"
            name="back"
            value={card.back}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formDecks">
          <Form.Label>
            Decks (New Deck will be created if doesn't exist)
          </Form.Label>
          <CreatableSelect
            isMulti
            name="decks"
            options={deckOptions}
            value={decks}
            onChange={handleChangeDecks}
            styles={deckSelectCustomStyling}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <div dangerouslySetInnerHTML={{ __html: card.back }} />
    </div>
  );
};

export default CardForm;
