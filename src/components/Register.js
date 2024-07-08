import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./styles/register.css"; // Archivo de estilos CSS

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const ApiUser = async () => {
        try {
            const url = "http://localhost:5000/api/contact/";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            });

            if (response.ok) {
                alert("Usuario registrado");
                navigate('/login');
                // Puedes redirigir al usuario a otra página después del registro si es necesario
            } else {
                throw new Error('Error al registrar usuario');
            }
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            // Manejar errores aquí, por ejemplo, mostrar un mensaje de error al usuario
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ApiUser();
    };

    return (
        <div className="registerPage">
            <form onSubmit={handleSubmit} className="registerForm">
                <h2>Registro</h2>
                <div className="formGroup">
                    <label>Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="formInput"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="formInput"
                        required
                    />
                </div>
                <button type="submit" className="submitButton">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
