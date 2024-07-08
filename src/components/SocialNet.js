import React, { useState } from "react";
import { utils, writeFile } from 'xlsx';
import './styles/social.css';
import { useParams } from 'react-router-dom';

const SocialSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams(); // Obtener el userId de los parámetros de la URL

    const evaluateRisk = (url) => {
        const urlLower = url.toLowerCase();
        if (urlLower.includes("github") && (urlLower.includes("config") || urlLower.includes("secret") || urlLower.includes("password"))) {
            return 5; // Datos confidenciales expuestos
        } else if (urlLower.includes("linkedin") || urlLower.includes("contact") || urlLower.includes("strategy")) {
            return 4; // Información de contacto o estratégica
        } else if (urlLower.includes("profile") || urlLower.includes("personal") || urlLower.includes("bio")) {
            return 3; // Datos sobre personal
        } else {
            return 1; // Datos públicos o irrelevantes
        }
    };

    const handleSearch = async () => {
        setError(null);
        setResults([]);
        try {
            const response = await fetch(`https://social-links-search.p.rapidapi.com/search-social-links?query=${searchQuery}&social_networks=facebook%2Ctiktok%2Cinstagram%2Csnapchat%2Ctwitter%2Cyoutube%2Clinkedin%2Cgithub%2Cpinterest`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '7b94842645msh93c56907e88affdp1ce6fcjsn7543715a97fb',
                    'x-rapidapi-host': 'social-links-search.p.rapidapi.com'
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Error al obtener los datos de la API: ${response.status} ${response.statusText} - ${errorDetails}`);
            }

            const { data } = await response.json();
            console.log(data); // Inspecciona la estructura de data

            const allResults = [];
            Object.entries(data).forEach(([platform, links]) => {
                if (Array.isArray(links)) {
                    links.forEach(link => {
                        const risk = evaluateRisk(link);
                        allResults.push({
                            platform,
                            link,
                            risk
                        });
                    });
                }
            });

            setResults(allResults);
        } catch (error) {
            setError(error.message);
        }
    };

    const exportToExcel = () => {
        const dataForExcel = results.map(({ platform, link, risk }) => ({
            Plataforma: platform,
            Enlace: link,
            Riesgo: risk
        }));
        const worksheet = utils.json_to_sheet(dataForExcel);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Resultados de Redes Sociales");
        writeFile(workbook, "resultados_redes_sociales.xlsx");
    };

    const guardarSocial = async () => {
        try {
            const promises = results.map(result => {
                const postData = {
                    UserId: userId, // Asegúrate de obtener el userId adecuadamente
                    Platform: result.platform,
                    Link: result.link,
                    Risk: result.risk
                };

                return fetch('http://localhost:5000/api/social', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                });
            });

            await Promise.all(promises);
            alert('Datos guardados exitosamente');
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar los datos. Consulta la consola para más detalles.');
        }
    };

    return (
        <div className="mainSearch">
            <div className="tittle">
                <h1>BuscaActivos en Redes Sociales</h1>
            </div>
            <div className="cuerpoGS">
                <h3>Ingrese la info a buscar:</h3>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="botonGS">
                    <button className="bn62" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
            <div className="resultadosGS">
                <h3>Resultados:</h3>
                {error ? (
                    <p className="error">{error}</p>
                ) : (
                    <div className="result-grid-container">
                        <div className="result-grid">
                            {results.length > 0 ? (
                                results.map((result, index) => (
                                    <div key={index} className="result-item">
                                        <h3>{result.platform}</h3>
                                        <a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
                                        <p><strong>Riesgo:</strong> <span className={`highlight risk-${result.risk}`}>{result.risk}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p>No hay resultados</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="botonGS">
                <button className="bn62" onClick={exportToExcel}>Exportar a Excel</button>
                <button className="bn62" onClick={guardarSocial}>Guardar</button>
            </div>
            <div className="regresarBTNGS">
                <a href="../" className="bn62">Regresar</a>
            </div>
        </div>
    );
};

export default SocialSearch;
