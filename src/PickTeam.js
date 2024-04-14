import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';
import './PickTeam.css';  // Ensure you have this CSS for styling

function PickTeam() {
    const { team, setGameTeam } = useGame();
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const navigate = useNavigate();

    const toggleSelectPlayer = (player) => {
        setSelectedPlayers(prevSelected =>
            prevSelected.includes(player)
                ? prevSelected.filter(p => p !== player)
                : [...prevSelected, player]
        );
    };

    const handleSelectAllPlayers = () => {
        setSelectedPlayers(team); // Select all players
    };

    const handleStartGame = () => {
        setGameTeam(selectedPlayers);
        navigate('/timer');
    };

    return (
        <div className="pick-team">
            <h1 className="page-title">Select Players for the Game</h1>
            <Button onClick={handleSelectAllPlayers} className="start-game-btn select-all-btn">Select All Players</Button>
            <div className="player-list">
                {team.map(player => (
                    <div key={player.name} className={`player-item ${selectedPlayers.includes(player) ? 'selected' : ''}`} onClick={() => toggleSelectPlayer(player)}>
                        {player.name}
                    </div>
                ))}
            </div>
            <Button onClick={handleStartGame} className="start-game-btn">Start Game</Button>
        </div>
    );
}

export default PickTeam;
