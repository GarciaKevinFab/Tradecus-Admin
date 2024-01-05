import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import '../../styles/tour/createTour.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTour = () => {
    const [tourData, setTourData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photos: [], // Aquí
        desc: '',
        price: '',
        maxGroupSize: '',
        featured: false
    });
    
    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_tours");
    };

    const handleChange = (event) => {
        setTourData({
            ...tourData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(tourData).forEach(key => formData.append(key, tourData[key]));
        try {
            console.log(tourData)
            await axios.post(`${BASE_URL}/tours`, formData);
            toast.success('Tour creado exitosamente!');
            setTourData({
                title: '',
                city: '',
                address: '',
                distance: '',
                photo: '',
                desc: '',
                price: '',
                maxGroupSize: '',
                featured: false
            });
        } catch (error) {
            toast.error('Ocurrió un error al crear el tour');
        }
    };

    return (
        <div className="CreateTour">

            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" name="title" value={tourData.title} onChange={handleChange} />
                </label>
                <label>
                    Ciudad:
                    <input type="text" name="city" value={tourData.city} onChange={handleChange} />
                </label>
                <label>
                    Dirección:
                    <input type="text" name="address" value={tourData.address} onChange={handleChange} />
                </label>
                <label>
                    Distancia:
                    <input type="text" name="distance" value={tourData.distance} onChange={handleChange} />
                </label>
                <label>
                    Fotos:
                    <input type="file" name="photos" multiple onChange={e => setTourData({ ...tourData, photos: e.target.files })} />
                </label>

                <label>
                    Descripción:
                    <textarea name="desc" value={tourData.desc} onChange={handleChange} />
                </label>
                <label>
                    Precio:
                    <input type="number" name="price" value={tourData.price} onChange={handleChange} />
                </label>
                <label>
                    Máximo tamaño del grupo:
                    <input type="number" name="maxGroupSize" value={tourData.maxGroupSize} onChange={handleChange} />
                </label>
                <label>
                    ¿Destacado?
                    <input type="checkbox" name="featured" checked={tourData.featured} onChange={() => setTourData({ ...tourData, featured: !tourData.featured })} />
                </label>
                <input type="submit" value="Crear tour" />
            </form>
            <button onClick={handleBack}>Regresar</button>

        </div>

    );
};

export default CreateTour;
