import React, { useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PreviousGames.css';  

function PreviousGames() {
  const navigate = useNavigate();
  const [savedGames, setSavedGames] = useState(JSON.parse(localStorage.getItem('savedGames')) || []);

  const goToHome = () => {
    navigate('/');
  };

  const formatTime = (time) => {
    const parts = time.split(':');
    return parts[1] + ':' + parts[2]; 
  };

  const handleRemoveGame = (index) => {
    const updatedGames = [...savedGames];
    updatedGames.splice(index, 1);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
    setSavedGames(updatedGames); // Update the state to reflect the removed game
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
            <Button variant="danger" onClick={() => handleRemoveGame(index)} className="rem-btn">Remove Game</Button>
          </div>
        ))}
      </div>
      <Button onClick={goToHome} className="mt-3 pg-home-button">Home</Button>
    </div>
  );
}

export default PreviousGames;
