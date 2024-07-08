import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './styles/site.css';

const Main = () => {
    const { userId } = useParams(); // Obtener el userId de los parámetros de la URL

    return (
        <div className='main'>
            <div className="titulo">
                <h1>Bienvenidos a BuscaActivos</h1>
            </div>
            <div className='loggoIN'>
                <Link to="/login" className='linkito'>Log In</Link>
            </div>
            <div className='loggoIN'>
                <Link to="/register" className='linkito'>Register</Link>
            </div>
            <div className="botones">
                <div className='boton'>
                    <Link to={`/subdominio/${userId}`} className="bn62">Subdominios</Link>
                </div>
                <div className='boton'>
                    <Link to={`/googleSearch/${userId}`} className="bn62">Google</Link>
                </div>
                <div className='boton'>
                    <Link to={`/socialNet/${userId}`} className="bn62">Social Net</Link>
                </div>
                <div className='boton'>
                    <Link to={`/reportes/${userId}`} className="bn62">Mis reportes</Link>
                </div>
            </div>
        </div>
    );
};

export default Main;
