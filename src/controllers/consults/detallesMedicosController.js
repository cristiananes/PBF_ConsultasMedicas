// Definimos la constante para la media de rating.
const MEDIA_RATING = 5;
// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que retorna info privada del medico.
const getPrivateUserInfoController = async (req, res, next) => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario.
        const [users] = await pool.query(
            `SELECT id, username, email, avatar FROM users WHERE id = ?`,
            [req.user.id],
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                user: users[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPrivateUserInfoController;
