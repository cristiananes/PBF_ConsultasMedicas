// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos los query params necesarios.
        let { firstName, lastName } = req.query;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de entradas.
        const [users] = await pool.query(
            `
            SELECT  
             u.id, 
             u.username, 
             u.firstName, 
             u.lastName, 
             u.email, 
             d.specialty, 
             d.experience
            FROM users u
            INNER JOIN doctors or u.id = e.userId
            WHERE e.place LIKE ? AND u.username LIKE ?
        `,
            // Si "firstname" o "lastname" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${firstName || ''}%`, `%${lastName|| ''}%`],
        );

        // Si hay entradas buscamos las fotos de cada entrada.
        for (const entry of entries) {
            // Buscamos las fotos de la entrada actual.
            const [photos] = await pool.query(
                `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
                [entry.id],
            );

            // Agregamos el array de fotos a la entrada actual.
            entry.photos = photos;
        }

        // Enviamos una respuesta al cliente.
        res.sed({
            status: 'ok',
            data: {
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listEntriesController;
