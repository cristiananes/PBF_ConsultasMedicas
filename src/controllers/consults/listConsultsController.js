// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const listconsultsController = async (req, res, next) => {
    try {
        // Obtenemos los query params necesarios.
        let { place, author } = req.query;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de entradas.
        const [consults] = await pool.query(
            `
            SELECT  
                e.id,
                e.title,
                e.place,
                e.description,
                u.username AS author,
                e.createdAt
            FROM consults e
            INNER JOIN users u ON u.id = e.userId
            WHERE e.place LIKE ? AND u.username LIKE ?
        `,
            // Si "place" o "author" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${place || ''}%`, `%${author || ''}%`]
        );

        // Si hay entradas buscamos las fotos de cada entrada.
        for (const consult of consults) {
            // Buscamos las fotos de la entrada actual.
            const [photos] = await pool.query(
                `SELECT id, name FROM consultPhotos WHERE consultId = ?`,
                [consult.id]
            );

            // Agregamos el array de fotos a la entrada actual.
            consult.photos = photos;
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                consults,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listconsultsController;
