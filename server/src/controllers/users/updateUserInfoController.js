// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';
import generateError from '../../utils/generateErrorUtil.js'; // Importamos la función de utilidad

// Controlador para actualizar la información del usuario
const updateUserInfoController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario desde el token (deberías tener un middleware que lo decodifique)
        const userId = req.user.id; // Asegúrate de que esto esté disponible en tu middleware de autenticación.

        // Obtenemos los datos que queremos actualizar desde el cuerpo de la solicitud
        const { firstName, lastName, username, biography } = req.body;

        // Obtenemos una conexión con la base de datos
        const pool = await getPool();

        // Actualizamos la información del usuario en la base de datos
        const [result] = await pool.query(
            `
            UPDATE users
            SET firstName = ?, lastName = ?, username = ?, biography = ?
            WHERE id = ?
            `,
            [firstName, lastName, username, biography, userId]
        );

        // Verificamos si se actualizó alguna fila
        if (result.affectedRows === 0) {
            throw generateError('No se ha podido realizar ningún cambio', 404);
        }

        // Enviamos una respuesta de éxito
        res.send({
            status: 'ok',
            message: 'Información del usuario actualizada con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export default updateUserInfoController;
