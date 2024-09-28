// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import savePhotoUtil from '../../utils/savePhotoUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite crear una nueva entrada.
const newconsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { title, description, urgency, speciality } = req.body;

        // Lanzamos un error si faltan campos.
        if (!title || !description || !urgency || !speciality ) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Guardamos la entrada (sin las fotos).
        const [newconsult] = await pool.query(
            `INSERT INTO consults(title, description, urgency, speciality, userId) VALUES (?, ?, ?, ?)`,
            [title, description, urgency, speciality, req.user.id]
        );

        // Creamos un array con los valores del objeto "files". Esto nos permitirá crear un array con
        // las fotos recibidas del cliente. Utilizamos el "slice" para evitar que nos puedan llegar más
        // de tres fotos dado que es el límite que hemos establecido para cada entrada.
        const photosArr = Object.values(req.files).slice(0, 3);

        // Recorremos el array de fotos para almacenar las fotos en disco y guardarlas en la base de datos.
        for (const photo of photosArr) {
            // Guardamos la foto en la carpeta de subida de archivos.
            const photoName = await savePhotoUtil(photo, 1000);

            // Guardamos la foto en la base de datos.
            await pool.query(
                `INSERT INTO consultPhotos(name, consultId) VALUES(?, ?)`,
                [photoName, newconsult.insertId]
            );
        }

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Entrada creada',
        });
    } catch (err) {
        next(err);
    }
};

export default newconsultController;
