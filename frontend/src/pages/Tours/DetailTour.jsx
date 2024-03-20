import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const TourDetail = () => {
  const [tour, setTour] = useState(null);
  const { id } = useParams();

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

  if (!tour) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>{tour.title}</h2>
      <p>Ciudad: {tour.city}</p>
      <p>Dirección: {tour.address}</p>
      <p>Distancia: {tour.distance}</p>

      <p>Descripción: {tour.desc}</p>
      <p>Precio: {tour.price}</p>
      <p>Tamaño máximo del grupo: {tour.maxGroupSize}</p>
      {/* Agregar visualización de las imágenes */}
      <div>
        <h3>Imágenes del Tour</h3>

        {tour.photos &&
          tour.photos.length > 0 &&
          tour.photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.secure_url} alt={`Imagen ${index + 1}`} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TourDetail;
