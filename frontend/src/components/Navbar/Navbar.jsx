import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navbar.css";
import { BASE_URL } from '../../utils/config';

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const url = `${BASE_URL}/users/me`;
      console.log('Fetching user data from:', url); // Mostrar la URL completa antes de la solicitud

      try {
        const response = await axios.get(url, { withCredentials: true });
        console.log('User data received:', response.data); // Mostrar los datos recibidos en caso de éxito
        setUser(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user data:', error); // Mostrar error en caso de fallo
        console.error('Error details:', error.response || error.message); // Mostrar detalles del error
        setError('Error fetching user data');
        setUser(null);
      } finally {
        setLoading(false);
        console.log('Fetching user data finished'); // Indicar que la solicitud ha finalizado
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="navbar">
      <div className="user-data">
        {loading ? (
          <span>Cargando...</span>
        ) : error ? (
          <span>Error al cargar los datos del usuario</span>
        ) : user ? (
          <>
            <span>{user.username || 'Nombre de usuario no disponible'}</span>
            <div className="user-img-container">
              <img
                className="user-img"
                src={user.photo || "https://res.cloudinary.com/du9dasmxo/image/upload/v1687728482/san_blas/man-smiling_lewrij.jpg"}
                alt="Imagen del usuario"
              />
            </div>
          </>
        ) : (
          <span>Usuario no encontrado</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
