// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

function Home() {
 return (
   <div className="home">
     <div className="title">
       IntraTracker
     </div>
     {/*
      Add the image below
      <img src={`${process.env.PUBLIC_URL}/IntraTrackerLogo.png`} alt="logo" className="logo" />
      End of image
    */}
     <div className="btn-container rounded-pill mt-3 bubble-light">
       <Link to="/team" className="btn btn-primary rounded-pill ms-3 button-style home-button">Manage Team</Link>
       <Link to="/pick-team" className="btn btn-primary rounded-pill ms-3 button-style home-button">Start New Game</Link>
       <Link to="/previous-games" className="btn btn-primary rounded-pill ms-3 button-style home-button">Previous Games</Link> {/* Add this line */}
     </div>
   </div>
 );
}

export default Home;
