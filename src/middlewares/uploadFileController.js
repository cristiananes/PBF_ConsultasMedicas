// Importamos dependencias
import multer from 'multer';

// Declaramos la variable que almacenaremos usando multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// Subimos los archivos declarados con el nombre asignado
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 125 }, // Tamaño máximo de archivo: 125MB
});

export default upload;
