import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ name, position, captain, playing }) => {
    return (
      <div className="player-details">
        <h2 className="name circle">{name}</h2>
      </div>
    );
};

export default PlayerInfo;
