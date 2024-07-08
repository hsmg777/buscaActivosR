import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import './styles/google.css';

const GoogleSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useParams(); // Obtener el userId de los parámetros de la URL

    const evaluateRisk = (result) => {
        const title = result.title.toLowerCase();
        const snippet = result.snippet.toLowerCase();

        if (title.includes("config") || snippet.includes("config") ||
            title.includes("password") || snippet.includes("password") ||
            title.includes("credentials") || snippet.includes("credentials")) {
            return 5; // Información sensible o datos de acceso
        } else if (title.includes("internal") || snippet.includes("internal") ||
                   title.includes("private") || snippet.includes("private") ||
                   title.includes("restricted") || snippet.includes("restricted")) {
            return 4; // Información relevante o contextual
        } else if (title.includes("github") || snippet.includes("github") ||
                   title.includes("pastebin") || snippet.includes("pastebin") ||
                   title.includes("code") || snippet.includes("code")) {
            return 3; // Exposición en repositorios públicos
        } else {
            return 1; // Información pública o no sensible
        }
    };

    const handleSearch = async () => {
        setError(null);
        try {
            const response = await fetch("https://google.serper.dev/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': '877a1ab9e5abc9c1f3f741281a4cf8a62bc4a68d'
                },
                body: JSON.stringify({ q: searchQuery })
            });

            if (!response.ok) {
                throw new Error(`Error al obtener los datos de la API: ${response.statusText}`);
            }

            const data = await response.json();
            const evaluatedResults = (data.organic || []).map(result => ({
                ...result,
                risk: evaluateRisk(result)
            }));

            setResults(evaluatedResults);
        } catch (error) {
            setError(error.message);
        }
    };

    const exportToExcel = () => {
        const dataForExcel = results.map(({ title, link, snippet, risk }) => ({
            Título: title,
            Enlace: link,
            Descripción: snippet,
            Riesgo: risk
        }));
        const worksheet = utils.json_to_sheet(dataForExcel);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Resultados de Búsqueda");
        writeFile(workbook, "resultados_busqueda.xlsx");
    };

    return (
        <div className="mainSearch">
            <div className="tittle">
                <h1>BuscaActivos en Google</h1>
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
                                        <h3>{result.title}</h3>
                                        <a href={result.link} target="_blank" rel="noopener noreferrer">{result.link}</a>
                                        <p>{result.snippet}</p>
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
            </div>
            <div className="regresarBTNGS">
                <a href="../" className="bn62">Regresar</a>
            </div>
        </div>
    );
};

export default GoogleSearch;
