// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Subdominios from './components/Subdominio';
import GoogleSearch from './components/GoogleSearch';
import SocialNet from './components/SocialNet';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/subdominio" element={<Subdominios />} />
          <Route path="/googleSearch" element={<GoogleSearch />} />
          <Route path="/socialNet" element={<SocialNet/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
