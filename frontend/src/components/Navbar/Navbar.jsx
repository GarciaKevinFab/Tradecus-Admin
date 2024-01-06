import React from "react";
import "./navbar.css"; // Importar los estilos

function Navbar() {
  return (
    <nav className="navbar">
      <div className="user-data">
        <span>jhonatan MC</span>
        <div className="user-img-container">
          <img
            className="user-img"
            src="https://res.cloudinary.com/du9dasmxo/image/upload/v1687728482/san_blas/man-smiling_lewrij.jpg"
            alt="Imagen del usuario"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
