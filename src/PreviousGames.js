import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PreviousGames.css';  // Import a new CSS file for styling

function PreviousGames() {
  const navigate = useNavigate();
  const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];

  const goToHome = () => {
    navigate('/');
  };

  const formatTime = (time) => {
    const parts = time.split(':');
    return parts[1] + ':' + parts[2];  // Remove the hour and display only minutes and seconds
  };

  return (
    <div className="previous-games">
     <h1 className="page-title">Previous Games</h1>
      <div className="games-list">
        {savedGames.map((game, index) => (
          <div key={index} className="game-entry">
            <h3>{game.gameName}</h3>
            <ul>
              {Object.entries(game.playerTimes).map(([name, time]) => (
                <li key={name}>{name}: {formatTime(time)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Button onClick={goToHome} className="mt-3 pg-home-button">Home</Button>
    </div>
  );
}

export default PreviousGames;
