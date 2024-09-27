import express from 'express';
const router = express.Router();

// Define tus rutas aquí
router.get('/example', (req, res) => {
    res.send('Ruta de ejemplo');
});

export default router;  // Esta es la exportación por defecto
