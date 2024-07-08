import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import './styles/subdo.css';

const Subdominios = () => {
    const [results, setResults] = useState([]);
    const { userId } = useParams();

    const handleSearch = async (domain) => {
        const response = await fetch(`https://subdomain-finder3.p.rapidapi.com/v1/subdomain-finder/?domain=${domain}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ca2de54915msh47c6f73f1c96837p100833jsnfdecc09caff8',
                'X-RapidAPI-Host': 'subdomain-finder3.p.rapidapi.com'
            }
        });
        const data = await response.json();
        const enrichedData = data.subdomains.map(subdomain => ({
            ...subdomain,
            subdomainRisk: evaluateSubdomainRisk(subdomain.subdomain),
            ipRisk: evaluateIpRisk(subdomain.ip)
        }));
        setResults(enrichedData);
    };

    const evaluateSubdomainRisk = (subdomain) => {
        if (subdomain.includes("admin") || subdomain.includes("secure")) {
            return 5; // Alto riesgo
        } else if (subdomain.includes("staging") || subdomain.includes("dev")) {
            return 4; // Medio Alto
        } else if (subdomain.includes("www") || subdomain.includes("blog")) {
            return 2; // Medio
        } else {
            return 1; // Bajo
        }
    };

    const evaluateIpRisk = (ip) => {
        if (!ip) {
            return 1; // Riesgo bajo por defecto si IP es null 
        }
        if (ip.startsWith("192.") || ip.startsWith("10.") || ip.startsWith("172.")) {
            return 2; // Medio Bajo
        } else {
            return 3; // Medio
        }
    };

    const exportToExcel = () => {
        const dataForExcel = results.map(({ subdomain, ip, subdomainRisk, ipRisk }) => ({
            Subdominio: subdomain,
            IP: ip || 'N/A',
            'Riesgo del Subdominio': subdomainRisk,
            'Riesgo de la IP': ipRisk
        }));
        const worksheet = utils.json_to_sheet(dataForExcel);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Subdominios");
        writeFile(workbook, "subdominios.xlsx");
    };

    const saveSearchResults = async () => {
        try {
            const promises = results.map(async (result) => {
                const response = await fetch('http://localhost:5000/api/subdo/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        UserId: userId,
                        Subdomain: result.subdomain,
                        IP: result.ip || '',
                        SubdomainRisk: result.subdomainRisk || 0,
                        IPRisk: result.ipRisk || 0
                    })
                });
                const data = await response.json();
                console.log('Saved:', data);
            });

            await Promise.all(promises);
            alert('Búsqueda guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Hubo un error al intentar guardar la búsqueda');
        }
    };

    return (
        <div className='mainSubdo'>
            <div className="titulo">
                <h1>Buscador de SubDominios</h1>
            </div>
            <div className="cuerpo">
                <form
                    id="searchForm"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const domain = e.target.elements.domain.value;
                        handleSearch(domain);
                    }}
                >
                    <h3>Ingrese el dominio a buscar:</h3>
                    <input name="domain" />
                    <div className="boton">
                        <button type="submit" className="bn62">Buscar</button>
                    </div>
                </form>
            </div>
            <div id="resultados" className="resultados">
                <h3>Resultados:</h3>
                <div className="grid-container">
                    {results.length > 0 ? (
                        results.map((subdomain, index) => (
                            <div key={index} className="subdomain-item">
                                <strong>Subdominio:</strong> {subdomain.subdomain} <br />
                                <strong>IP:</strong> {subdomain.ip || 'N/A'} <br />
                                <strong>Riesgo del Subdominio:</strong> <span className={`highlight risk-${subdomain.subdomainRisk}`}>{subdomain.subdomainRisk}</span> <br />
                                <strong>Riesgo de la IP:</strong> <span className={`highlight risk-${subdomain.ipRisk}`}>{subdomain.ipRisk}</span> <br />
                            </div>
                        ))
                    ) : (
                        <p>No hay resultados</p>
                    )}
                </div>
            </div>
            <div className="boton">
                <button onClick={exportToExcel} className="bn62">Exportar a Excel</button>
                <button onClick={saveSearchResults} className="bn62">Guardar</button>
            </div>
            

            <div className="regresarBTN">
                <a href={`../main/${userId}`} className="bn62">Regresar</a>
            </div>
        </div>
    );
};

export default Subdominios;
