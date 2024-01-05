import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './manageTours.css';

const ManageTours = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/tours`);
                console.log(res.data)
                setTours(res.data.data); // Modificar esta línea
                setLoading(false);
            } catch (error) {
                toast.error("Error al obtener los Tours");
                setLoading(false);
            }
        };

        fetchTours();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(tours)) {
        return <p>No tours available</p>;
    }

    return (
        <div>
            <h2>Gestionar Tours</h2>
            {tours.length === 0 ? (
                <p>No hay tours disponibles</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Ciudad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour._id}>
                                <td>{tour.title}</td>
                                <td>{tour.city}</td>
                                <td>
                                    <Link to={`/edit_tour/${tour._id}`} className="btn secondary__btn">
                                        Editar
                                    </Link>
                                    <Link to={`/delete_tour/${tour._id}`} className="btn secondary__btn">
                                        Eliminar
                                    </Link>
                                    <Link to={`/detail_tour/${tour._id}`} className="btn secondary__btn">
                                        Ver
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="btn secondary__btn">
                <Link to="/create_tour">Crear nuevo tour</Link>
            </button>
        </div>
    );
}
export default ManageTours;
