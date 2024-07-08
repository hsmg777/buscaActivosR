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
                <Link to="/googleSearch" className="bn62">Google</Link>
                </div>
                <div className='boton'>
                <Link to="/socialNet" className="bn62">Social Net</Link>
                </div>
            </div>
        </div>
    );
};

export default Main;
