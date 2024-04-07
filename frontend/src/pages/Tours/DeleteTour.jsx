import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import '../../styles/tour/deleteTour.css';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteTour = () => {
    const { id } = useParams();

    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_tours");
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/tours/${id}`);
            toast.success('Tour eliminado exitosamente!');
            handleBack();
        } catch (error) {
            toast.error('Ocurrió un error al eliminar el tour');
        }
    };

    return (
        <div className="DeleteTour">
            <h2>¿Estás seguro de que quieres eliminar este tour?</h2>
            <button onClick={handleDelete} className='buttons deleteButton '>Eliminar tour</button>
            <button onClick={handleBack} className='backButton buttons'>Regresar</button>
        </div>
        
    );
};

export default DeleteTour;
