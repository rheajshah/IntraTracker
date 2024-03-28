import React, { useState, useEffect } from 'react';
import { Button, Alert, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Add this line

import "./Home.css";

function Home() {
    return (
      <div className="home">
        <div className="btn-container rounded-pill mt-3 bubble-light">
            <Link to="/team" className="btn btn-primary rounded-pill ms-3 button-style home-button">Manage Team</Link>
            <Link to="/timer" className="btn btn-primary rounded-pill ms-3 button-style home-button">Timer Dashboard</Link>
        </div>
      </div>
    );
  }
  
  export default Home;