import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EndGame() {
  const navigate = useNavigate();
  const playerTimes = JSON.parse(localStorage.getItem('playerTimes')) || {};

  const saveGame = () => {
    const gameName = prompt("Please enter a name for the game:");
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
    <div className="end-game">
      <h2>Game Ended. Player Stats:</h2>
      <ul>
        {Object.entries(playerTimes).map(([name, time]) => (
          <li key={name}>{`${name}'s Time: ${time}`}</li>
        ))}
      </ul>
      <Button onClick={editTime} className="mt-3">Edit Time</Button>
      <Button onClick={saveGame} className="mt-3">Save Game</Button>
      <Button onClick={goToHome} className="mt-3">Home</Button>
    </div>
  );
}

export default EndGame;
