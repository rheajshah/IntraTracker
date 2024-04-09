import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ name, position, captain, playing }) => {
    return (
      <div className="player-details">
        <h2 className="name circle">{name}</h2>
        <p className="pos">Position: {position}</p>
        <p className="cap">Team Captain: {captain ? "yes" : "no"}</p>
        <p className="playing">Currently Playing: {playing ? "yes" : "no"}</p>
      </div>
    );
};

export default PlayerInfo;
