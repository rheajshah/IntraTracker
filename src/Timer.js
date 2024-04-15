import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGame } from './GameContext';

import "./Timer.css";

const PlayerClock = ({ player, timer, toggleTimer }) => {
  // Generate initials from first and last names
  const initials = `${player.name.charAt(0)}${player.lastName ? player.lastName.charAt(0) : ''}`;

  return (
    <div className="player-clock">
      <h3 className={`name circle ${timer.isActive ? 'active' : 'inactive'}`}>{initials}</h3>
      <h5>{player.name}</h5>
      <h3>{new Date(timer.seconds * 1000).toISOString().substr(11, 8)}</h3>
      <Button variant={timer.isActive ? 'danger' : 'success'} onClick={() => toggleTimer(player.name)}>
        {timer.isActive ? 'Pause' : 'Start'}
      </Button>
    </div>
  );
};


function Timer() {
  const navigate = useNavigate();
  const { gameTeam } = useGame();

  const [timers, setTimers] = useState(
    gameTeam.reduce((acc, player) => {
      acc[player.name] = { seconds: 0, isActive: false };
      return acc;
    }, {})
  );

  const [gameClock, setGameClock] = useState({ seconds: 0, isActive: false });

  const toggleGameClock = () => {
    setGameClock(prevGameClock => {
        const newActiveState = !prevGameClock.isActive;
        if (!newActiveState) { // If we are pausing the game clock
            // Pause all player timers
            setTimers(prevTimers => {
                const newTimers = { ...prevTimers };
                for (const key of Object.keys(newTimers)) {
                    newTimers[key] = { ...newTimers[key], isActive: false };
                }
                return newTimers;
            });
        }
        return { ...prevGameClock, isActive: newActiveState };
    });
  };


  const toggleTimer = (playerName) => {
    if (!gameClock.isActive) {
      alert("Game Clock is Paused, Start game clock to start Player Timer!");
      return;
    }
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
    const interval = setInterval(() => {
      let updatedTimers = {...timers};

      if (gameClock.isActive) {
        setGameClock(prevGameClock => ({
          ...prevGameClock,
          seconds: prevGameClock.seconds + 1
        }));
      }

      for (const [playerName, timer] of Object.entries(timers)) {
        if (timer.isActive) {
          updatedTimers[playerName].seconds = timer.seconds + 1;
        }
      }
      
      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameClock, timers]);

  const endGame = () => {
    const playerTimesForStorage = {};
    Object.keys(timers).forEach(playerName => {
      const timeString = new Date(timers[playerName].seconds * 1000).toISOString().substr(11, 8);
      playerTimesForStorage[playerName] = timeString;
    });
    localStorage.setItem('playerTimes', JSON.stringify(playerTimesForStorage));
    navigate('/endGame');
  };

  return (
    <div className="timer">
      <div className="timer-container">
        <div className="game-clock">
          <h3>{new Date(gameClock.seconds * 1000).toISOString().substr(11, 8)}</h3>
          <Button className="eg-btn" variant={gameClock.isActive ? 'danger' : 'success'} onClick={toggleGameClock}>
            {gameClock.isActive ? 'Pause Game' : 'Start Game'}
          </Button>
        </div>
      </div>
      <h3 className="page-title text-center">Player Times:</h3>
      <div>
        {gameTeam.map(player => (
          <PlayerClock key={player.name} player={player} timer={timers[player.name]} toggleTimer={toggleTimer} />
        ))}
      </div>
      <Button variant="warning" onClick={endGame} className="mt-3 pg-home-button eg-btn">End Game</Button>
    </div>
  );
}

export default Timer;
