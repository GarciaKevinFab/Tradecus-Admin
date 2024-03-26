import express from 'express';
import { createTour, deleteTour, getTourById, getAllTour, getFeaturedTour, getSingleTour, getTourBySearch, getTourCount, updateTour } from './../controllers/tourController.js';
import { upload } from '../utils/multer.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// create new tour
router.post('/', ensureAuthenticated, upload.array('photos', 3), createTour);

//update tour
router.put('/:id', ensureAuthenticated, updateTour);

//delete tour
router.delete('/:id', ensureAuthenticated, deleteTour);

//get single tour
router.get('/:id', ensureAuthenticated, getSingleTour);

//get all tours
router.get('/', ensureAuthenticated, getAllTour);

//get tour by search
router.get('/search/getTourBySearch', ensureAuthenticated, getTourBySearch);
router.get('/search/getFeaturedTours', ensureAuthenticated, getFeaturedTour);
router.get('/search/getTourCount', ensureAuthenticated, getTourCount);

export default router;