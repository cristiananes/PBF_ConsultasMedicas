// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto.
import removePhotoUtil from '../../utils/removePhotoUtil.js';

// Función controladora que elimina una entrada concreta por ID.
const deleteEntryController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada a eliminar.
        const { entryId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Localizamos las fotos vinculadas a la entrada.
        const [photos] = await pool.query(
            `SELECT name FROM entryPhotos WHERE entryId = ?`,
            [entryId],
        );

        // Si hay alguna foto las eliminamos del disco.
        for (const photo of photos) {
            await removePhotoUtil(photo.name);
        }

        // Eliminamos las fotos de la base de datos.
        await pool.query(`DELETE FROM entryPhotos WHERE entryId = ?`, [
            entryId,
        ]);

        // Eliminamos los votos de la entrada.
        await pool.query(`DELETE FROM entryVotes WHERE entryId = ?`, [entryId]);

        // Eliminamos la entrada.
        await pool.query(`DELETE FROM entries WHERE id = ?`, [entryId]);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Entrada eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteEntryController;
