import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const APiuser = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/contact/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            setError("Error al conectarse a la API");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        APiuser();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const user = usuarios.find(u => u.name === username && u.password === password);
    
        if (user) {
            console.log("Inicio de sesión exitoso!");
            navigate(`/main/${user.id_user}`); // Redirigir con el userId
        } else {
            setError("Credenciales incorrectas");
        }
    };
    const registerGO = () =>{
        navigate('/register');
    }

    return (
        <div className="loginPage" style={styles.page}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.heading}>Iniciar Sesión</h2>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="username">Usuario:</label>
                    <input
                        style={styles.input}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label} htmlFor="password">Contraseña:</label>
                    <input
                        style={styles.input}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.button}>Ingresar</button>
                <button onClick={registerGO} style={styles.button}>Registrarse</button>
            </form>
            
        </div>
    );
};

const styles = {
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    },
    form: {
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        width: "300px",
    },
    heading: {
        marginBottom: "1.5rem",
        textAlign: "center",
    },
    inputGroup: {
        marginBottom: "1rem",
    },
    label: {
        display: "block",
        marginBottom: "0.5rem",
    },
    input: {
        width: "100%",
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "1rem",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: "1rem",
    },
};

export default Login;
