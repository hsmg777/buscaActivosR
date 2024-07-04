// src/components/Main.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/site.css';

const Main = () => {
    return (
        <div className='main'>
            <div className="titulo">
                <h1>Bienvenidos a BuscaActivos</h1>
            </div>
            <div className="botones">
                <div className='boton'>
                <Link to="/subdominio" className="bn62">Subdominios</Link>
                </div>
                <div className='boton'>
                <a href="https://www.google.com" className="bn62" target="_blank" rel="noopener noreferrer">Google</a>
                </div>
                <div className='boton'>
                <a href="https://www.facebook.com" className="bn62" target="_blank" rel="noopener noreferrer">Social Nets</a>
                </div>
            </div>
        </div>
    );
};

export default Main;
