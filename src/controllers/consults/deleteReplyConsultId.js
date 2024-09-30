// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite borrar una respuesta a una consulta.
const deleteReplyController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { replyId } = req.params;

        // Lanzamos un error si falta el campo.
        if (!replyId) {
            generateErrorUtil('Falta el ID de la respuesta', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Verificamos si la respuesta existe.
        const [reply] = await pool.query(
            `SELECT * FROM consultResponses WHERE id = ?`,
            [replyId]
        );

        if (reply.length === 0) {
            generateErrorUtil('Respuesta no encontrada', 404);
        }

        // Verificamos si el usuario es el propietario de la respuesta.
        if (reply[0].userId !== req.user.id) {
            generateErrorUtil('No tienes permiso para borrar esta respuesta', 403);
        }

        // Borramos la respuesta de la base de datos.
        await pool.query(
            `DELETE FROM consultResponses WHERE id = ?`,
            [replyId]
        );

        // Enviamos una respuesta al cliente.
        res.status(200).send({
            status: 'ok',
            message: 'Respuesta borrada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteReplyController;