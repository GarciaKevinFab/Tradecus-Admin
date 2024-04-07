import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageSubscribes = () => {
    const [subscribes, setSubscribes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribes = async () => {
            try {
                const res = await axios.get('/subscribe'); // Usando la ruta relativa
                setSubscribes(res.data);
                setLoading(false);
            } catch (error) {
                toast.error("An error occurred while fetching subscribes");
                setLoading(false);
            }
        };

        fetchSubscribes();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(subscribes) || subscribes.length === 0) {
        return <p>No subscribes available</p>;
    }

    return (
        <div>
            <h2>Manage Subscribes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {subscribes.map((subscribe) => (
                        <tr key={subscribe._id}>
                            <td>{subscribe.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageSubscribes;
