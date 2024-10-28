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
            `SELECT id, email, username, firstName, lastName, biography, avatar, role FROM users WHERE id = ?`,
            [req.user.id]
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
                    id: users[0].id,
                    email: users[0].email,
                    username: users[0].username,
                    firstName: users[0].firstName,
                    lastName: users[0].lastName,
                    biography: users[0].biography,
                    avatar: users[0].avatar,
                    role: users[0].role,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserInfoController;
