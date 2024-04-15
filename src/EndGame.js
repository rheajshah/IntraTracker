import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './PickTeam.css';
import './EndGame.css';

function EndGame() {
    const navigate = useNavigate();
    const playerTimes = JSON.parse(localStorage.getItem('playerTimes')) || {};

    const saveGame = async () => {
        const { value: gameName } = await Swal.fire({
            title: 'Enter the name of the game',
            input: 'text',
            inputPlaceholder: 'Enter the name of the game',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                }
            }
        }) || { value: "Unnamed Game" };

        if (gameName) {
            const savedGames = JSON.parse(localStorage.getItem('savedGames')) || [];
            const newGame = {
                id: new Date().getTime(),
                gameName,
                playerTimes
            };
            savedGames.push(newGame);
            localStorage.setItem('savedGames', JSON.stringify(savedGames));
            Swal.fire({
                title: 'Success!',
                text: 'Game saved!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="pick-team">
            <h2 className='page-title'>Game Ended. Player Stats:</h2>
            <ul className="player-stats text-center">
                {Object.entries(playerTimes).map(([name, time]) => (
                    <li key={name}>{`${name}'s Time: ${time}`}</li>
                ))}
            </ul>
            <Button onClick={saveGame} className="mt-3 start-game-btn">
                Save Game
            </Button>
            <Button onClick={goToHome} className="mt-3 start-game-btn">
                Home
            </Button>
        </div>
    );
}

export default EndGame;
