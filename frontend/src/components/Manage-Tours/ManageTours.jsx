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
        const fetchToursAndReviews = async () => {
            try {
                const [tourRes, reviewRes] = await Promise.all([
                    axios.get(`${BASE_URL}/tours`),
                    axios.get(`${BASE_URL}/review`) // Asume que esta es la URL correcta para obtener todas las reseñas
                ]);

                const tourData = tourRes.data.data;
                const reviews = reviewRes.data.data;

                // Asignar reseñas a cada tour
                const toursWithReviews = tourData.map((tour) => {
                    const tourReviews = reviews.filter(review => review.productId.toString() === tour._id.toString());
                    const totalReviews = tourReviews.length;
                    const totalRating = totalReviews > 0 ? tourReviews.reduce((sum, review) => sum + review.rating, 0) : 0;
                    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

                    return {
                        ...tour,
                        reviews: totalReviews,
                        rating: averageRating,
                    };
                });

                setTours(toursWithReviews);
                setLoading(false);
            } catch (error) {
                toast.error("Error al obtener los Tours o las reseñas");
                setLoading(false);
            }
        };

        fetchToursAndReviews();
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
                            <th>Reviews</th>
                            <th>Rating</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tours.map((tour) => (
                            <tr key={tour._id}>
                                <td>{tour.title}</td>
                                <td>{tour.city}</td>
                                <td>{tour.reviews}</td>
                                <td>{tour.rating ? tour.rating.toFixed(2) : 'N/A'}</td>
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
