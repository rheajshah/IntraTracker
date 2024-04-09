import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function PreviousGames() {
  const navigate = useNavigate();
  const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="previous-games">
      <h2>Previous Games</h2>
      <ul>
        {savedGames.map((game, index) => (
          <li key={index}>{game.gameName} - Players Time: {JSON.stringify(game.playerTimes)}</li>
        ))}
      </ul>
      <Button onClick={goToHome} className="mt-3">Home</Button>
    </div>
  );
}

export default PreviousGames;
