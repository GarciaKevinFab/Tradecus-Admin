import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteReview = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/manage_reviews');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/review/${reviewId}`);
      toast.success('Reseña eliminada exitosamente!');
      navigate('/manage_reviews');
    } catch (error) {
      toast.error('Ocurrió un error al eliminar la reseña');
    }
  };

  return (
    <div className="DeleteReview">
      <h2>¿Estás seguro de que quieres eliminar esta reseña?</h2>
      <button onClick={handleDelete}>Eliminar reseña</button>
      <button onClick={handleBack}>Regresar</button>
    </div>
  );
};

export default DeleteReview;
