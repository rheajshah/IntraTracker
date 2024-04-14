import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PickTeam.css'; // Import the PickTeam CSS for styling

function AddPlayer({ addPlayer }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        addPlayer({
            name: firstName, // Continue using first name as the primary identifier
            lastName, // Add last name to player data
            // Assuming captain and active status are not needed now as per the unused warning
        });
        navigate('/team');
    };

    return (
        <div className="pick-team"> {/* Reuse the pick-team class for consistent styling */}
            <h1 className="page-title">Add Player</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter player's first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter player's last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="start-game-btn"> {/* Reuse the start-game-btn class */}
                    Save Player
                </Button>
            </Form>
        </div>
    );
}

export default AddPlayer;
