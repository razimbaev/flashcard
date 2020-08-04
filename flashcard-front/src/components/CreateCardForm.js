import React, { useState } from "react";
import CardForm from "./CardForm";
import * as service from "./service";

const CreateCardForm = () => {
  const [card, setCard] = useState({ front: "", back: "" });

  return (
    <div>
      <h3 className="side-padding text-center">Create New Index Card</h3>
      <CardForm
        card={card}
        setCard={setCard}
        serviceCall={service.createNewCard}
        isCreate={true}
      />
    </div>
  );
};

export default CreateCardForm;
