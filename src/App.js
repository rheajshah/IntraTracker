import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Players from './Players';
import Timer from './Timer';
import AddPlayerWrapper from './AddPlayerWrapper'; 
import EndGame from './EndGame';
import { GameProvider } from './GameContext';
import NavbarComponent from './Navbar'; 

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GameProvider>
        <NavbarComponent /> {/* Navbar is now part of the routing context */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Players />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/add-player" element={<AddPlayerWrapper />} />
            <Route path="/endGame" element={<EndGame />} />
          </Routes>
          </GameProvider>
        </BrowserRouter>

    </div>
  );
}

export default App;
