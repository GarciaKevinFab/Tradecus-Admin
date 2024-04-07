import express from "express";
import ensureAuthenticated from "../middleware/authMiddleware.js"; // Asegúrate de que la ruta es correcta
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, getCurrentUser } from "../controllers/userController.js";
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas existentes
router.put('/:id', ensureAuthenticated, updateUser);
router.delete('/:id', ensureAuthenticated, deleteUser);
router.get('/:id', ensureAuthenticated, getSingleUser);
router.get('/', ensureAuthenticated, getAllUser);

router.get('/me', ensureAuthenticated, getCurrentUser);


export default router;
