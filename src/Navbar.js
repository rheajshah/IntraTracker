import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom'; // Import Link
import './Navbar.css';

export default function NavbarComponent() {
  return (
    <Navbar expand="lg" className="nav-container">
      <Navbar.Brand as={Link} to="/">
        <img className="nav-brand nav-logo"
          src={`${process.env.PUBLIC_URL}/IntraTrackerLogo.png`}
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav">
          {/* Use Link component for navigation */}
          <Nav.Link as={Link} to="/team">Manage Team</Nav.Link>
          <Nav.Link as={Link} to="/timer">Start New Game</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
