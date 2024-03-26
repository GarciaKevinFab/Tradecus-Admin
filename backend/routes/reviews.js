import express from 'express';
import { createReview, getReviews, deleteReview } from '../controllers/reviewController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:tourId', ensureAuthenticated, createReview);

// Ruta para obtener todas las revisiones de un tour específico
router.get('/', ensureAuthenticated, getReviews);

router.delete('/:reviewId', ensureAuthenticated, deleteReview);


export default router;