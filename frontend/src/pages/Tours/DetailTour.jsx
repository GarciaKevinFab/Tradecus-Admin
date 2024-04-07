<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import "../../styles/tour/detailTour.css";
=======
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848

const TourDetail = () => {
  const [tour, setTour] = useState(null);
  const { id } = useParams();

<<<<<<< HEAD
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(res.data.data);
      } catch (error) {}
    };
    
    fetchTour();
  }, [id]);
  console.log(tour)
=======
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`/tours/${id}`);
                setTour(res.data.data);
            } catch (error) {
            }
        };
>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848

  if (!tour) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container">
      <h2 className="title">{tour.title}</h2>
      <div className="detail">
        <p>Ciudad: {tour.city}</p>
        <p>Dirección: {tour.address}</p>
        <p>Distancia: {tour.distance}</p>
        <p>Descripción: {tour.desc}</p>
        <p>Precio: {tour.price}</p>
        <p>Tamaño máximo del grupo: {tour.maxGroupSize}</p>
      </div>

<<<<<<< HEAD
      {/* Agregar visualización de las imágenes */}
        <h3>Imágenes del Tour</h3>
      <div className="image-container">
        {tour.photos &&
          tour.photos.length > 0 &&
          tour.photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.secureUrl} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
      </div>
=======
    return (
        <div>
            <h2>{tour.title}</h2>
            <p>Ciudad: {tour.city}</p>
            <p>Dirección: {tour.address}</p>
            <p>Distancia: {tour.distance}</p>

>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848

      <div className="button-container">
        <Link to="/manage_tours" className="button">
          Volver atrás
        </Link>
      </div>
    </div>
  );
};

export default TourDetail;
