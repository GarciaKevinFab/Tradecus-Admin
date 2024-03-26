import express from 'express';
import { getDniData } from '../controllers/dniController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/getDniData/:dni', ensureAuthenticated, getDniData);

export default router;
