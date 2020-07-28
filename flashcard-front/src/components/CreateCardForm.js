import React, { useState } from "react";
import axios from "axios";

const CreateCardForm = () => {
  const [card, setCard] = useState({ front: "", back: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleSubmit = (event) => {
    if (card.front && card.back) {
      axios
        .post("http://localhost:8080/api/v1/card", {
          cardFront: card.front,
          cardBack: card.back,
        })
        .then((result) => {
          alert(JSON.stringify(result));
        })
        .catch((error) => {
          alert(JSON.stringify(error));
        });
    }
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="front">
          Card Front:
          <input
            type="text"
            id="front"
            name="front"
            value={card.front}
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <br />
        <label htmlFor="back">
          Card Back:
          <textarea
            id="back"
            name="back"
            rows="10"
            cols="100"
            value={card.back}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <br />
      Card Back Displayed Below (in case of html):
      <br />
      <div dangerouslySetInnerHTML={{ __html: card.back }} />
    </div>
  );
};

export default CreateCardForm;
