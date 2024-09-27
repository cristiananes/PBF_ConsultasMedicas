// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto.
import removePhotoUtil from '../../utils/removePhotoUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que elimina una foto de una entrada.
const deletePhotoController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada y de la foto que queremos eliminar.
        const { consultId, photoId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Tratamos de obtener la foto que queremos borrar.
        const [photos] = await pool.query(
            `SELECT name FROM consultPhotos WHERE id = ? AND consultId = ? `,
            [photoId, consultId]
        );

        // Si la foto no existe lanzamos un error.
        if (photos.length < 1) {
            generateErrorUtil('Foto no encontrada', 404);
        }

        // Eliminamos la foto de la carpeta de subida de archivos.
        await removePhotoUtil(photos[0].name);

        // Eliminamos la foto de la base de datos.
        await pool.query(`DELETE FROM consultPhotos WHERE id = ?`, [photoId]);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Foto eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deletePhotoController;
