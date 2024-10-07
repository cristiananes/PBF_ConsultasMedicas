// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que retorna info privada del médico.
const getPrivateUserInfoController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario desde los parámetros.
        const { userId } = req.params; // Asegúrate de que la ID se pase en los parámetros.

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario, asegurando que sea un doctor.
        const [users] = await pool.query(
            `SELECT id, username, email, avatar, role 
             FROM users 
             WHERE id = ? AND role = 'doctor'`, // Verificamos que el rol sea 'doctor'
            [userId] // Usamos userId en lugar de req.user.id
        );

        // Lanzamos un error si el usuario no existe o no es un doctor.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado o no es un doctor', 404);
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
