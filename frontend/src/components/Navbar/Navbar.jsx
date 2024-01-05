import React from 'react';
import './navbar.css'; // Importar los estilos

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                {/* Coloca tu logo aquí */}
            </div>
            <ul className="navbar__links">
                <li className="navbar__item"><a href="/dashboard">Dashboard</a></li>
                {/* Agrega más enlaces según sea necesario */}
            </ul>
        </nav>
    );
}

export default Navbar;
