import express from 'express';
import { sendMessage, getContactMessages, deleteContactMessage, getContactMessage } from '../controllers/contactController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for getting all contact messages
router.get('/', ensureAuthenticated, getContactMessages);

// Route for deleting a contact message
router.delete('/:id', ensureAuthenticated, deleteContactMessage);

// Route for sending a contact message
router.post('/', sendMessage);

router.get('/:id', ensureAuthenticated, getContactMessage);

export default router;
