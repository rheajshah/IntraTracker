import React, { useState } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import './Navbar.css';

export default function NavbarComponent() {
  const [expanded, setExpanded] = useState(false); // State to manage navbar collapse
  const location = useLocation(); // Get current location
  
  const handleNavbarToggle = () => setExpanded(!expanded); // Function to toggle navbar collapse

  // Function to collapse navbar when a link is clicked
  const handleLinkClick = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  return (
    <Navbar expand="lg" className="nav-container" expanded={expanded}>
      <Navbar.Brand as={Link} to="/" onClick={handleLinkClick}> {/* Add onClick to collapse navbar */}
        <img className="nav-brand nav-logo"
          src={`${process.env.PUBLIC_URL}/IntraTrackerLogo.png`}
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleNavbarToggle} /> {/* Add onClick to toggle navbar */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav word-links">
          {/* Use Link component for navigation */}
          <Nav.Link as={Link} to="/team" onClick={handleLinkClick}>Manage Team</Nav.Link> {/* Add onClick to collapse navbar */}
          <Nav.Link as={Link} to="/pick-team" onClick={handleLinkClick}>Start New Game</Nav.Link> {/* Add onClick to collapse navbar */}
          <Nav.Link as={Link} to="/previous-games" onClick={handleLinkClick}>Previous Games</Nav.Link> {/* Add onClick to collapse navbar */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}