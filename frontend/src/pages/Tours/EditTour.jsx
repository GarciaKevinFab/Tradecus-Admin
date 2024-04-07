import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/tour/editTour.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTour = () => {

    const { id } = useParams();

    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_tours");
    };

    const [tourData, setTourData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        photo: '',
        desc: '',
        reviews: [],
        price: '',
        maxGroupSize: '',
        featured: false,
    });

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`/tours/${id}`);
                setTourData(res.data.data || {});
            } catch (error) {
                toast.error('Ocurrió un error al obtener el tour');
            }
        };
        fetchTour();
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setTourData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/tours/${id}`, tourData);
            toast.success('Tour actualizado exitosamente!');
            navigate("/manage_tours");
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el tour');
        }
    };

    return (
        <div className="EditTour">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={tourData.title}
                    onChange={handleChange}
                    required
                />
<<<<<<< HEAD
            </label>
            <input type="submit" value="Actualizar tour" />
        </form>
        <button onClick={handleBack} className='back'>Regresar</button>
=======
                <input
                    type="text"
                    name="city"
                    value={tourData.city}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={tourData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="distance"
                    value={tourData.distance}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="photo"
                    value={tourData.photo}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="desc"
                    value={tourData.desc}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={tourData.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="maxGroupSize"
                    value={tourData.maxGroupSize}
                    onChange={handleChange}
                    required
                />
                <label>
                    Featured:
                    <input
                        name="featured"
                        type="checkbox"
                        checked={tourData.featured}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Actualizar tour" />
            </form>
            <button onClick={handleBack}>Regresar</button>
>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848

        </div>

    );
};

export default EditTour;
