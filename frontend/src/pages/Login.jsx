import React from 'react';
import '../styles/login.css';
import { BASE_URL } from '../utils/config';

const Login = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${BASE_URL}/auth/google`;
    };

    return (
        <div className="login-form-container">
            <div className="login-form">
                <button onClick={handleGoogleLogin} className="google-sign-in-button">
                    Iniciar sesión con Google
                </button>
            </div>
        </div>
    );
};

export default Login;
