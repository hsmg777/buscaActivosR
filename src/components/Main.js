// src/components/Main.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/site.css';

const Main = () => {
    return (
        <div>
            <div className="titulo">
                <h1>Bienvenidos a BuscaActivos</h1>
            </div>
            <div className="botones">
                <Link to="/subdominio" className="bn62">Subdominios</Link>
                <a href="https://www.google.com" className="bn62" target="_blank" rel="noopener noreferrer">Google</a>
                <a href="https://www.facebook.com" className="bn62" target="_blank" rel="noopener noreferrer">Social Nets</a>
            </div>
        </div>
    );
};

export default Main;
