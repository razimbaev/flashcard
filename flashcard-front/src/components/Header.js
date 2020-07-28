import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        FlashCard
      </Navbar.Brand>
      <Nav className="mr-auto">
        |
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        |
        <Nav.Link as={Link} to="/createcard">
          Create New Card
        </Nav.Link>
        |
        <Nav.Link as={Link} to="/viewcards">
          View All Cards
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
