// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto.
import removePhotoUtil from '../../utils/removePhotoUtil.js';

// Función controladora que elimina una entrada concreta por ID.
const deleteconsultController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada a eliminar.
        const { consultId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Localizamos las fotos vinculadas a la entrada.
        const [photos] = await pool.query(
            `SELECT name FROM consultPhotos WHERE consultId = ?`,
            [consultId]
        );

        // Si hay alguna foto las eliminamos del disco.
        for (const photo of photos) {
            await removePhotoUtil(photo.name);
        }

        // Eliminamos las fotos de la base de datos.
        await pool.query(`DELETE FROM consultPhotos WHERE consultId = ?`, [
            consultId,
        ]);

        // Eliminamos los votos de la entrada.
        await pool.query(`DELETE FROM consultVotes WHERE consultId = ?`, [
            consultId,
        ]);

        // Eliminamos la entrada.
        await pool.query(`DELETE FROM consults WHERE id = ?`, [consultId]);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Entrada eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteconsultController;
