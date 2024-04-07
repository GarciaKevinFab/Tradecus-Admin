import express from 'express';
import { subscribe, getSubscribers } from '../controllers/subscribeController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for creating a new subscriber
router.post('/', ensureAuthenticated, subscribe);

// Route for getting all subscribers
router.get('/', ensureAuthenticated, getSubscribers);

export default router;
