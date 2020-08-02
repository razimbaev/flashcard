import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import * as service from "./service";

const StudySettingsModal = ({ show, handleClose, setFilters }) => {
  const [deckOptions, setDeckOptions] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    service
      .getAllDecks()
      .then((result) => {
        const allDecks = result.data.map((deck) => {
          return { value: deck, label: deck };
        });
        setDeckOptions(allDecks);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  const handleChangeFilters = (newFilterData) => {
    setFilterData(newFilterData);
  };

  const handleSaveFiltersAndClose = () => {
    setFilters(filterData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          isMulti
          name="decks"
          options={deckOptions}
          value={filterData}
          onChange={handleChangeFilters}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveFiltersAndClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudySettingsModal;
