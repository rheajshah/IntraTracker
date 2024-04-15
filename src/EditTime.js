import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './PickTeam.css';

function EditTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const { playerTimes, gameId } = location.state;
    const [times, setTimes] = useState(playerTimes);

    const handleTimeChange = (name, newTime) => {
        setTimes(prevTimes => ({ ...prevTimes, [name]: newTime }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { value: gameName } = await Swal.fire({
            title: 'Enter the name of this game',
            input: 'text',
            inputPlaceholder: 'Enter the name of the game',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        }) || { value: "Unnamed Game" }; // Use "Unnamed Game" if no input provided

        let savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
        let gameExists = false;

        const updatedGames = savedGames.map(game => {
            if (game.id === gameId) {
                gameExists = true;
                return { ...game, gameName, playerTimes: times };
            }
            return game;
        });

        if (!gameExists) {
            updatedGames.push({ id: gameId, gameName, playerTimes: times });
        }

        localStorage.setItem('savedGames', JSON.stringify(updatedGames));
        Swal.fire({
            title: 'Success!',
            text: 'Changes saved successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        });
        navigate('/previous-games');
    };

    return (
        <div className="pick-team">
            <h2 className="page-title">Edit Player Times</h2>
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
                <Button type="submit" className="start-game-btn">
                    Save Changes
                </Button>
            </Form>
            <Button variant="secondary" className="start-game-btn" onClick={() => navigate(-1)}>
                Back
            </Button>
        </div>
    );
}

export default EditTime;
