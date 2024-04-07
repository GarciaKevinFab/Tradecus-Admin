import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteUser = () => {
    const { id } = useParams();

    const navigate = useNavigate(); // Hook useNavigate

    const handleBack = () => {
        navigate("/manage_users");
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${id}`);
            toast.success('Usuario eliminado exitosamente!');
            navigate("/manage_users");
        } catch (error) {
            toast.error('Ocurrió un error al eliminar el usuario');
        }
    };

    return (
        <div className="DeleteUser">
            <h2>¿Estás seguro de que quieres eliminar este usuario?</h2>
            <button onClick={handleDelete}>Eliminar usuario</button>
            <button onClick={handleBack}>Regresar</button>
        </div>

    );
};

export default DeleteUser;
