import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TagsInput from "react-tagsinput";

const CreateCardForm = () => {
  const [card, setCard] = useState({ front: "", back: "" });
  const [tags, setTags] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard({ ...card, [name]: value });
  };

  const handleTags = (newTags) => {
    setTags(newTags);
  };

  const handleSubmit = (event) => {
    if (card.front && card.back) {
      const tagNames = tags.map((tagName) => {
        return { tagName };
      });

      axios
        .post("http://localhost:8080/api/v1/card", {
          cardFront: card.front,
          cardBack: card.back,
          tags: tagNames,
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
    <div className="side-padding">
      <br />
      <h3 className="text-center">Create New Index Card</h3>
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
        <Form.Group controlId="formTags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            as={TagsInput}
            type="text"
            placeholder="some tag"
            name="tags"
            value={tags}
            onChange={handleTags}
            onlyUnique={true}
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

export default CreateCardForm;
