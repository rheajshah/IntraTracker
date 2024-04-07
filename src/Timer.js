import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./Timer.css";
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext'; // Import useGame from GameContext

const PlayerClock = ({ player, timer, toggleTimer }) => {
  return (
    <div className="player-clock">
      <h3>{player.name}'s Time: {new Date(timer.seconds * 1000).toISOString().substr(11, 8)}</h3>
      <Button variant={timer.isActive ? 'danger' : 'success'} onClick={() => toggleTimer(player.name)}>
        {timer.isActive ? 'Pause' : 'Start'}
      </Button>
    </div>
  );
 };
 

// Timer component to display all players' clocks
function Timer() {
  const navigate = useNavigate();
  const { team } = useGame(); // Use the useGame hook to get the team data

  const [timers, setTimers] = useState(
    team.reduce((acc, player) => { // Initialize timers with the team from context
      acc[player.name] = { seconds: 0, isActive: false };
      return acc;
    }, {})
  );

  const toggleTimer = (playerName) => {
    setTimers(prevTimers => {
      const isActive = !prevTimers[playerName].isActive;
      const newTimers = {
        ...prevTimers,
        [playerName]: { ...prevTimers[playerName], isActive }
      };
      return newTimers;
    });
  };

  useEffect(() => {
    const activeTimers = Object.entries(timers).filter(([, timer]) => timer.isActive);
    if (activeTimers.length === 0) return;

    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const newTimers = { ...prevTimers };
        activeTimers.forEach(([playerName]) => {
          newTimers[playerName].seconds += 1;
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  const endGame = () => {
    // Save the times to localStorage
    const playerTimesForStorage = {};
    Object.keys(timers).forEach((playerName) => {
      const timeString = new Date(timers[playerName].seconds * 1000).toISOString().substr(11, 8);
      playerTimesForStorage[playerName] = timeString;
    });
    localStorage.setItem('playerTimes', JSON.stringify(playerTimesForStorage));
    navigate('/endGame');
  };

  return (
    <div className="timer">
      {team.map(player => ( // Render player clocks based on the team from context
        <PlayerClock key={player.name} player={player} timer={timers[player.name]} toggleTimer={toggleTimer} />
      ))}
      <Button variant="warning" onClick={endGame} className="mt-3">End Game</Button>
    </div>
  );
}

export default Timer;
