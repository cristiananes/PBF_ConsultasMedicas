// Importamos dependencias
import express from 'express';

// Creamos el router a traves de express
const router = express.Router();

// Importar los controladores de consultas

// Define tus rutas aquí

// Ruta de ejemplo
router.get('/example', (req, res) => {
    res.send('Ruta de ejemplo');
});

export default router; // Esta es la exportación por defecto
