// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const getEntryByIdController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada.
        const { entryId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos la entrada con el ID proporcionado.
        const [entries] = await pool.query(
            `
            SELECT  
                e.id,
                e.title,
                e.place,
                e.description,
                u.username AS author,
                e.createdAt
            FROM entries e
            INNER JOIN users u ON u.id = e.userId
            WHERE e.id = ?
        `,
            [entryId],
        );

        // Buscamos las fotos de la entrada.
        const [photos] = await pool.query(
            `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
            [entries[0].id],
        );

        // Agregamos el array de fotos a la entrada.
        entries[0].photos = photos;

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                entry: entries[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getEntryByIdController;
