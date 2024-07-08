import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import "./styles/Reporte.css"; // Import your CSS file

const Reportes = () => {
    const { userId } = useParams();
    const [resultados, setResultados] = useState([]);
    const [social, setSocial] = useState([]);
    const [view, setView] = useState(''); // Estado para controlar la vista actual

    const verSocial = async () => {
        console.log("Cargando...");
        try {
            const response = await fetch(`http://localhost:5000/api/social/user/${userId}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const data = await response.json();
            setSocial(data);
            setView('social'); // Cambiar la vista actual a social
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const verReportes = async () => {
        console.log("Cargando...");
        try {
            const response = await fetch(`http://localhost:5000/api/subdo/user/${userId}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos');
            }
            const data = await response.json();
            setResultados(data);
            setView('subdominios'); // Cambiar la vista actual a subdominios
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    return (
        <div className="reporteMain">
            <div className="tituloRepo">
                <h1>MIS REPORTES</h1>
            </div>
            <div className="boton">
                <button onClick={verReportes} className="btn62">Ver Subdominios</button>
                <button onClick={verSocial} className="btn62">Ver Social Nets</button>
                <button onClick={verSocial} className="btn62">Ver GoogleSearch</button>
            </div>
            <div className="resultados">
                {view === 'subdominios' && resultados.length > 0 ? (
                    <table className="tabla-reportes">
                        <thead>
                            <tr>
                                <th>Fecha y Hora</th>
                                <th>IP</th>
                                <th>Riesgo IP</th>
                                <th>ID</th>
                                <th>Subdominio</th>
                                <th>Riesgo Subdominio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.map((reporte) => (
                                <tr key={reporte.Id}>
                                    <td>{reporte.FechaHora}</td>
                                    <td>{reporte.IP}</td>
                                    <td className={`risk-${reporte.IPRisk}`}>{reporte.IPRisk}</td>
                                    <td>{reporte.Id}</td>
                                    <td>{reporte.Subdomain}</td>
                                    <td className={`risk-${reporte.SubdomainRisk}`}>{reporte.SubdomainRisk}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : view === 'social' && social.length > 0 ? (
                    <table className="tabla-reportes">
                        <thead>
                            <tr>
                                <th>Plataforma</th>
                                <th>Enlace</th>
                                <th>Riesgo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {social.map((socialItem) => (
                                <tr key={socialItem.Link}>
                                    <td>{socialItem.Platform}</td>
                                    <td><a href={socialItem.Link} target="_blank" rel="noopener noreferrer">{socialItem.Link}</a></td>
                                    <td className={`risk-${socialItem.Risk}`}>{socialItem.Risk}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay reportes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Reportes;
