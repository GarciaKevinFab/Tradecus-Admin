import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = event => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if(form.username && form.password) {
            console.log("Form submitted: ", form);
            // Aquí puedes manejar la lógica para iniciar sesión.
        } else {
            alert("Por favor, rellena todos los campos.");
        }
    };

    return (
        <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Nombre de usuario" 
                    onChange={handleInputChange}
                />

                <div className="password-input-container">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Contraseña" 
                        onChange={handleInputChange}
                    />
                    <button 
                        type="button" 
                        className="toggle-password-visibility"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button type="submit" className="submit-button">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
