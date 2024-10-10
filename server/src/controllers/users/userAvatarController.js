// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import saveFileUtil from '../../utils/saveFileUtil.js';

// Importamos la función que elimina una foto del disco.
import removeFileUtil from '../../utils/removeFileUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que actualiza el avatar de un usuario.
const userAvatarController = async (req, res, next) => {
    try {
        // Obtenemos el avatar desde req.file, ya que multer maneja el archivo en req.file
        const avatar = req.file;

        // Lanzamos un error si falta el archivo.
        if (!avatar) {
            throw generateErrorUtil('Faltan campos: avatar');
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario para comprobar si existe un avatar previo.
        const [users] = await pool.query(
            `SELECT avatar FROM users WHERE id = ?`,
            [req.user.id]
        );

        // Lanzamos un error si el usuario no existe.
        if (users.length < 1) {
            throw generateErrorUtil('Usuario no encontrado', 404);
        }

        // Si el usuario ya tenía un avatar previo, lo eliminamos.
        if (users[0].avatar) {
            await removeFileUtil(users[0].avatar);
        }

        // Guardamos la foto en la carpeta 'uploads' y obtenemos el nombre de la misma.
        const avatarName = await saveFileUtil(avatar, 100);

        // Actualizamos los datos del usuario con el nuevo avatar.
        await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
            avatarName,
            req.user.id,
        ]);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                avatar: avatarName,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default userAvatarController;
