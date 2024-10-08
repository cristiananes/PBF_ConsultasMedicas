// Importamos las dependencias
import express from 'express';
import upload from '../middlewares/uploadFileController.js';
import saveFile from '../utils/saveFileUtil.js';

// Creamos el router a traves de express
const router = express.Router();

// Ruta para subir archivos
router.post('/upload', upload.single('file'), async (req, res, next) => {
    try {
        // Extraemos los archivos a subir
        const file = req.file;
        const width = req.body.width || 500; // Si es imagen, redimensionamos a este ancho

        // Guarda el archivo usando la utilidad saveFile
        const savedFileName = await saveFile(file, width);

        res.json({
            message: 'Archivo subido exitosamente',
            fileName: savedFileName,
        });
    } catch (err) {
        next(err);
    }
});

export default router;
