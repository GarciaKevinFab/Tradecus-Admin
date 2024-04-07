import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
            await axios.delete(`/tours/${id}`);
            toast.success('Tour eliminado exitosamente!');
<<<<<<< HEAD
            handleBack();
=======
            navigate("/manage_tours");  // Navegar después de la acción
>>>>>>> 263b48db6f0add4de01b009b8fb67e956bc83848
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
