// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import saveFileUtil from '../../utils/saveFileUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite crear una nueva entrada.
const newconsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos desde el form-data.
        const { title, description, urgency, specialtyName } = req.body;
        const file = req.file; // Este archivo será procesado por el middleware de multer

        // Logs de debugging
        console.log(`${title} : titulo`);
        console.log(`${description} : descripcion`);
        console.log(`${urgency} : urgency`);
        console.log(`${specialtyName} : specialytyname`);

        const userId = req.user.id; // Datos del usuario autenticado
        const userRole = req.user.role;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Verificamos que solo las pacientes pueden añadir consultas.
        if (userRole !== 'patient') {
            throw generateErrorUtil(
                'Solo los pacientes pueden añadir consultas',
                403
            );
        }

        // Verificamos si existe la especialidad.
        const [specialty] = await pool.query(
            `SELECT id FROM specialities WHERE name = ?`,
            [specialtyName]
        );
        if (specialty.length === 0) {
            throw generateErrorUtil('La especialidad no existe', 404);
        }

        // Lanzamos un error si faltan campos.
        if (!title || !description || !urgency || !specialty) {
            throw generateErrorUtil('Faltan campos', 400);
        }

        // Si hay un archivo subido, lo guardamos.
        let fileName = null;
        if (file) {
            fileName = await saveFileUtil(file, 1000); // Guardamos el archivo en disco
        }

        // Guardamos la entrada en la bd (incluyendo el archivo si existe).
        await pool.query(
            `INSERT INTO consults( title, description, urgency, specialityId, userId, file) VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, urgency, specialty[0].id, userId, fileName]
        );

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Entrada creada',
        });
    } catch (err) {
        next(err); // Pasamos el error al middleware de errores
    }
};

export default newconsultController;
