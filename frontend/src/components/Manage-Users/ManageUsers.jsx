import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/users');
                setUsers(res.data.data);
                setLoading(false);
            } catch (error) {
                toast.error("Error al obtener los usuarios");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!Array.isArray(users) || users.length === 0) {
        return <p>No hay usuarios disponibles</p>;
    }

    return (
        <div>
            <h2>Gestionar Usuarios</h2>
            {users.length === 0 ? (
                <p>No hay usuarios disponibles</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit_user/${user._id}`} className="btn secondary__btn">
                                        Editar
                                    </Link>
                                    <Link to={`/delete_user/${user._id}`} className="btn secondary__btn">
                                        Eliminar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="btn secondary__btn">
                <Link to="/create_user">Crear nuevo usuario</Link>
            </button>
        </div>
    );
}

export default ManageUsers;
