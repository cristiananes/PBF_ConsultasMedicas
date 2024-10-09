// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite actualizar el perfil del usuario.
const userProfileUpdateController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { email, username, nombre, apellidos, biografia, avatar } = req.body;

        // Obtenemos el id del usuario del token.
        const userId = req.user.id;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Comprobamos si el usuario existe y obtenemos los valores actuales.
        const [users] = await pool.query(
            `SELECT email, username, nombre, apellidos, biografia, avatar FROM users WHERE id = ?`,
            [userId]
        );

        // Si no existe ningún usuario, lanzamos un error.
        if (users.length < 1) {
            throw generateErrorUtil('Usuario no encontrado', 404);
        }

        // Obtenemos los valores actuales del usuario.
        const currentUser = users[0];

        // Usamos los valores actuales si algún campo no es proporcionado.
        const updatedEmail = email || currentUser.email;
        const updatedUsername = username || currentUser.username;
        const updatedNombre = nombre || currentUser.nombre;
        const updatedApellidos = apellidos || currentUser.apellidos;
        const updatedBiografia = biografia || currentUser.biografia;
        const updatedAvatar = avatar || currentUser.avatar;

        // Ejecutamos la consulta para actualizar el perfil del usuario.
        await pool.query(
            `UPDATE users SET email = ?, username = ?, nombre = ?, apellidos = ?, biografia = ?, avatar = ? WHERE id = ?`,
            [updatedEmail, updatedUsername, updatedNombre, updatedApellidos, updatedBiografia, updatedAvatar, userId]
        );

        // Enviamos una respuesta indicando que el perfil ha sido actualizado correctamente.
        res.status(200).send({
            status: 'ok',
            message: 'Perfil actualizado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default userProfileUpdateController;
