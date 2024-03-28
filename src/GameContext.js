import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerTimes, setPlayerTimes] = useState({});
  const [team, setTeam] = useState([]);

  const updatePlayerTimes = (name, time) => {
    setPlayerTimes((prevTimes) => ({
      ...prevTimes,
      [name]: time
    }));
  };

  const addPlayerToTeam = (newPlayer) => {
    setTeam((prevTeam) => [...prevTeam, newPlayer]);
  };

  const value = {
    playerTimes,
    updatePlayerTimes,
    team,
    addPlayerToTeam
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
