// In EditTime.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function EditTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const { playerTimes, gameId } = location.state; // Destructure gameId and playerTimes
    const [times, setTimes] = useState(playerTimes);

    const handleTimeChange = (name, newTime) => {
        setTimes(prevTimes => ({ ...prevTimes, [name]: newTime }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const gameName = prompt("Please enter a name for this game:") || "Unnamed Game";  // Provide a default name in case none is entered
        let savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        let gameExists = false;
    
        const updatedGames = savedGames.map(game => {
            if (game.id === gameId) {
                gameExists = true;
                return { ...game, gameName, playerTimes: times };  // Update the name along with the times
            }
            return game;
        });
    
        // If the game does not exist in saved games, add it as a new entry
        if (!gameExists) {
            updatedGames.push({ id: gameId, gameName, playerTimes: times });
        }
    
        localStorage.setItem('savedGames', JSON.stringify(updatedGames));
        alert("Changes saved successfully!");
        navigate('/previous-games'); // Navigate to the Previous Games page or wherever appropriate
    };
    
    

    return (
        <div className="edit-time">
            <h2>Edit Player Times</h2>
            <Form onSubmit={handleSubmit}>
                {Object.entries(times).map(([name, time]) => (
                    <Form.Group key={name} className="mb-3">
                        <Form.Label>{name}'s Time:</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={time}
                            onChange={(e) => handleTimeChange(name, e.target.value)}
                        />
                    </Form.Group>
                ))}
                <Button type="submit" variant="primary">Save Changes</Button>
            </Form>
            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
}

export default EditTime;
