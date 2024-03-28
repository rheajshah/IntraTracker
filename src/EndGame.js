import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EndGame() {
  const navigate = useNavigate();
  // Retrieve the player times from localStorage
  const playerTimes = JSON.parse(localStorage.getItem('playerTimes')) || {};

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="end-game">
      <h2>Game Ended. Player Stats:</h2>
      <ul>
        {Object.entries(playerTimes).map(([name, time]) => (
          <li key={name}>{`${name}'s Time: ${time}`}</li>
        ))}
      </ul>
      <Button onClick={goToHome} className="mt-3">Home</Button>
    </div>
  );
}

export default EndGame;
