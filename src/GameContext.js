import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerTimes, setPlayerTimes] = useState({});
  const [team, setTeam] = useState([]);
  const [gameTeam, setGameTeam] = useState([]); // Players selected for the current game

  const updatePlayerTimes = (name, time) => {
    setPlayerTimes(prevTimes => ({
      ...prevTimes,
      [name]: time
    }));
  };

  const addPlayerToTeam = (newPlayer) => {
    setTeam(prevTeam => [...prevTeam, newPlayer]);
  };

  const removePlayerFromTeam = (name) => {
    setTeam(prevTeam => prevTeam.filter(player => player.name !== name));
  };

  const value = {
    playerTimes,
    updatePlayerTimes,
    team,
    addPlayerToTeam,
    removePlayerFromTeam,
    gameTeam,
    setGameTeam, // Properly use the setter for the current game team
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
