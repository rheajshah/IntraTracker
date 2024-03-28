import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlayerInfo from './components/PlayerInfo';
import { useGame } from './GameContext';
import "./Players.css";

function Players() {
  const { team } = useGame(); 

  return (
    <div className="players-page d-flex flex-column align-items-center justify-content-center">
      <div className="display-players">
        {team.map(player => (
          <PlayerInfo key={player.name} {...player} />
        ))}
      </div>
      <div>
        <Link to="/add-player" className="btn btn-primary rounded-pill ms-3 button-style home-button">Add Player</Link>
      </div>
    </div>
  );
}

export default Players;
