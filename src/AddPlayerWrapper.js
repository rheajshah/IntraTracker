import React from 'react';
import { useGame } from './GameContext';
import AddPlayer from './AddPlayer';

const AddPlayerWrapper = () => {
  const { addPlayerToTeam } = useGame();
  return <AddPlayer addPlayer={addPlayerToTeam} />;
};

export default AddPlayerWrapper;
