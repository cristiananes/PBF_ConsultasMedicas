// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import saveFileUtil from '../../utils/saveFileUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite crear una nueva entrada.
const newconsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { title, description, urgency, specialityId } = req.body;

        const user = req.user.id;
        if (user[0].role != "patient") {
            generateErrorUtil("solo los pacientes pueden añadir consultas", 403);

        }

        const file = req.files?.file;

        // Lanzamos un error si faltan campos.
        if (!title || !description || !urgency || !specialityId) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Guardamos la entrada (sin los archivos).
        await pool.query(
            `INSERT INTO consults( title, description, urgency, specialityId, userId) VALUES (?, ?, ?, ?,?)`,
            [title, description, urgency, specialityId, req.user.id]
        );




        // Guardamos la foto en la carpeta de subida de archivos.
        const fileName = await saveFileUtil(file, 1000);

        // Guardamos la foto en la base de datos.
        await pool.query(
            `INSERT INTO consults(file) VALUES(?)`,
            [fileName]
        );

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
