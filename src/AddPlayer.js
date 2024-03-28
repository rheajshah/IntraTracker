import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddPlayer({ addPlayer }) {
  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [isCaptain, setIsCaptain] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    addPlayer({
      name: playerName,
      position: playerPosition,
      captain: isCaptain,
      playing: isActive
    });
    navigate('/team');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formPlayerName">
        <Form.Label>Player Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter player's name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPlayerPosition">
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter player's position"
          value={playerPosition}
          onChange={(e) => setPlayerPosition(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIsCaptain">
        <Form.Check
          type="checkbox"
          label="Team Captain"
          checked={isCaptain}
          onChange={(e) => setIsCaptain(e.target.checked)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIsActive">
        <Form.Check
          type="checkbox"
          label="Currently Playing"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save Player
      </Button>
    </Form>
  );
}

export default AddPlayer;
