import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/manage_users");
    };

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/users/${id}`);
                const data = res.data.data;

                // Initialize fields to empty string if they are undefined or null
                setUserData({
                    username: data.username || '',
                    email: data.email || '',
                    password: data.password || '', // Consider handling password carefully
                    role: data.role || '',
                });
            } catch (error) {
                toast.error('Error al obtener los datos del usuario');
            }
        };
        fetchUser();
    }, [id]);


    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name; // This should be target.name, not target.username

        setUserData({
            ...userData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${BASE_URL}/users/${id}`, userData);
            toast.success('Usuario actualizado exitosamente!');
            navigate("/manage_users");  // After successful update, navigate back to the user list
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el usuario');
        }
    };

    return (
        <div className="EditUser">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={userData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Please choose an option--</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input type="submit" value="Actualizar usuario" />
            </form>
            <button onClick={handleBack}>Regresar</button>

        </div>

    );
};

export default EditUser;
