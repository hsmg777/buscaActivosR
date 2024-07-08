// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Subdominio from './components/Subdominio'; // Asegúrate de que este es el nombre correcto del archivo
import GoogleSearch from './components/GoogleSearch';
import SocialNet from './components/SocialNet';
import Login from './components/Login';
import Register from './components/Register';
import Reportes from './components/Reportes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/:userId" element={<Main />} />
          <Route path="/subdominio/:userId" element={<Subdominio />} />
          <Route path="/googleSearch/:userId" element={<GoogleSearch />} />
          <Route path="/socialNet/:userId" element={<SocialNet />} />
          <Route path="/reportes/:userId" element={<Reportes/>} />
          {/* Ruta predeterminada */}
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
