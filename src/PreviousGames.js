import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './PreviousGames.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PreviousGames() {
  const navigate = useNavigate();
  const [savedGames, setSavedGames] = useState(JSON.parse(localStorage.getItem('savedGames')) || []);

  const goToHome = () => {
    navigate('/');
  };

  const formatTime = (time) => {
    const parts = time.split(':');
    return parts[1] + ':' + parts[2]; 
  };

  const handleRemoveGame = (index) => {
    const updatedGames = [...savedGames];
    updatedGames.splice(index, 1);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
    setSavedGames(updatedGames); // Update the state to reflect the removed game
  };

  const playerTotals = useMemo(() => {
    const totals = {};
    savedGames.forEach(game => {
      Object.entries(game.playerTimes).forEach(([name, time]) => {
        const seconds = parseInt(time.split(':')[1]) * 60 + parseInt(time.split(':')[2]);
        if (totals[name]) {
          totals[name] += seconds;
        } else {
          totals[name] = seconds;
        }
      });
    });
    return totals;
  }, [savedGames]);

  const chartData = {
    labels: Object.keys(playerTotals),
    datasets: [{
      label: 'Total Time (seconds)',
      data: Object.values(playerTotals),
      backgroundColor: '#DA7308', // Orange color from CSS
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#666'
        }
      },
      x: {
        ticks: {
          color: '#666'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#666'
        }
      }
    }
  };

  return (
    <div className="previous-games">
      <h1 className="page-title">Previous Games</h1>
      <Bar data={chartData} options={chartOptions} />
      <div className="games-list">
        {savedGames.map((game, index) => (
          <div key={index} className="game-entry">
            <h3>{game.gameName}</h3>
            <ul>
              {Object.entries(game.playerTimes).map(([name, time]) => (
                <li key={name}>{name}: {formatTime(time)}</li>
              ))}
            </ul>
            <Button variant="danger" onClick={() => handleRemoveGame(index)} className="rem-btn">Remove Game</Button>
          </div>
        ))}
      </div>
      <Button onClick={goToHome} className="mt-3 pg-home-button">Home</Button>
    </div>
  );
}

export default PreviousGames;
