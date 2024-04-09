import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';

function EndGame() {
  const navigate = useNavigate();
  const playerTimes = JSON.parse(localStorage.getItem('playerTimes')) || {};
  const [show, setShow] = useState(false); // For the modal

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveGame = () => {
    const gameName = prompt("Please enter a name for the game:");
    if (gameName) {
      const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
      savedGames.push({ gameName, playerTimes });
      localStorage.setItem('savedGames', JSON.stringify(savedGames));
      alert("Game saved!");
    }
  };

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
      <Button onClick={saveGame} className="mt-3">Save Game</Button>
      <Button onClick={goToHome} className="mt-3">Home</Button>
    </div>
  );
}

export default EndGame;
