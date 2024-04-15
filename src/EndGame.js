import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PickTeam.css'; // Import the PickTeam CSS for styling
import './EndGame.css';
import Swal from 'sweetalert2';

function EndGame() {
    const navigate = useNavigate();
    const playerTimes = JSON.parse(localStorage.getItem('playerTimes')) || {};

    const saveGame = async () => { // Make the function asynchronous
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
                id: new Date().getTime(),  // Use current timestamp as unique ID
                gameName,
                playerTimes
            };
            savedGames.push(newGame);
            localStorage.setItem('savedGames', JSON.stringify(savedGames));
            alert("Game saved!");
        }
    };

    const goToHome = () => {
        navigate('/');
    };

    const editTime = () => {
        navigate('/edit-time', { state: { playerTimes, gameId: new Date().getTime() } }); // Pass current playerTimes and new gameId
    };

    return (
        <div className="pick-team"> {/* Reuse the pick-team class for consistent styling */}
            <h2 className='page-title'>Game Ended. Player Stats:</h2>
            <ul className="player-stats text-center">
                {Object.entries(playerTimes).map(([name, time]) => (
                    <li key={name}>{`${name}'s Time: ${time}`}</li>
                ))}
            </ul>
            <Button onClick={editTime} className="mt-3 start-game-btn"> {/* Reuse the start-game-btn class */}
                Edit Time
            </Button>
            <Button onClick={saveGame} className="mt-3 start-game-btn"> {/* Reuse the start-game-btn class */}
                Save Game
            </Button>
            <Button onClick={goToHome} className="mt-3 start-game-btn"> {/* Reuse the start-game-btn class */}
                Home
            </Button>
        </div>
    );
}

export default EndGame;
