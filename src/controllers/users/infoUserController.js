// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';
// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';
// Función controladora que retorna información personal del usuario.
const getUserInfoController = async (req, res, next) => {
    try {
        // Verifica que el usuario esté autenticado
        if (!req.user || !req.user.id) {
            return next(generateErrorUtil('Usuario no autenticado', 401));
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario.
        const [users] = await pool.query(
            `SELECT email, username, nombre, apellidos, biografia, avatar FROM users WHERE id = ?`,
            [req.user.id],
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            return next(generateErrorUtil('Usuario no encontrado', 404));
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                user: {
                    email: users[0].email,
                    username: users[0].username,
                    nombre: users[0].nombre,
                    apellidos: users[0].apellidos,
                    biografia: users[0].biografia,
                    avatar: users[0].avatar,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserInfoController;