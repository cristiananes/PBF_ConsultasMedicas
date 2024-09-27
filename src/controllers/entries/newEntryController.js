// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import savePhotoUtil from '../../utils/savePhotoUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite crear una nueva entrada.
const newEntryController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { title, place, description } = req.body;

        // Obtenemos una foto dado que es obligatorio mínima una foto.
        const photo1 = req.files?.photo;

        // Lanzamos un error si faltan campos.
        if (!title || !place || !description || !photo1) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Guardamos la entrada (sin las fotos).
        const [newEntry] = await pool.query(
            `INSERT INTO entries(title, place, description, userId) VALUES (?, ?, ?, ?)`,
            [title, place, description, req.user.id],
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
                `INSERT INTO entryPhotos(name, entryId) VALUES(?, ?)`,
                [photoName, newEntry.insertId],
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

export default newEntryController;
