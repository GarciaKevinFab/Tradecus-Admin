import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Importar configuración de Passport
import './config/passport-setup.js';

// Rutas
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js'; // Tus rutas de OAuth deben estar aquí
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import dniRoutes from './routes/dni.js';
import subscribeRoute from './routes/subscribes.js';
import contactRoutes from './routes/contacts.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configuración CORS
const corsOptions = {
    origin: process.env.FRONTEND_URI,
    credentials: true
};

app.use(cors(corsOptions));

// Conexión a la base de datos
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDB database connection failed', err);
    }
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" }
}));

// Inicializar Passport y sesiones de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute); // Esta es la ruta de autenticación
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/dni', dniRoutes);
app.use('/api/v1/subscribe', subscribeRoute);
app.use('/api/v1/contact', contactRoutes);

// Servir archivos estáticos para las imágenes subidas
app.use('/uploads', express.static('uploads'));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Iniciar servidor
app.listen(port, () => {
    connect();
    console.log(`Server listening on port ${port}`);
});
