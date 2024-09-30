// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite responder a una consulta.
const respondConsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { consultId, responseText } = req.body;

        // Lanzamos un error si faltan campos.
        if (!consultId || !responseText) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Verificamos si la consulta existe.
        const [consult] = await pool.query(
            `SELECT * FROM consults WHERE id = ?`,
            [consultId]
        );

        if (consult.length === 0) {
            generateErrorUtil('Consulta no encontrada', 404);
        }

        // Guardamos la respuesta en la base de datos.
        await pool.query(
            `INSERT INTO consultResponses(consultId, responseText, userId) VALUES (?, ?, ?)`,
            [consultId, responseText, req.user.id]
        );

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Respuesta guardada',
        });
    } catch (err) {
        next(err);
    }
};

export default respondConsultController;