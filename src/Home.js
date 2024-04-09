import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="title"> 
        IntraTracker
      </div>
      <div className="btn-container rounded-pill mt-3 bubble-light disappear">
        <Link to="/team" className="btn btn-primary rounded-pill ms-3 button-style home-button">Manage Team</Link>
        <Link to="/timer" className="btn btn-primary rounded-pill ms-3 button-style home-button">Start New Game</Link>
        <Link to="/previous-games" className="btn btn-primary rounded-pill ms-3 button-style home-button">Previous Games</Link> {/* Add this line */}
      </div>
    </div>
  );
}

export default Home;
