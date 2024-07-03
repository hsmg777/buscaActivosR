// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Subdominios from './components/Subdominio';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/subdominio" element={<Subdominios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
