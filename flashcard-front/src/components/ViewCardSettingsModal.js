import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";

const ViewCardSettingsModal = ({ show, handleClose, setFilters }) => {
  const [allDecks, setAllDecks] = useState([]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/deck")
      .then((result) => {
        setAllDecks(result.data);
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  }, []);

  const deckOptions = allDecks.map((deck) => {
    return { value: deck, label: deck };
  });

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
          name="colors"
          options={deckOptions}
          className="basic-multi-select"
          classNamePrefix="select"
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

export default ViewCardSettingsModal;
