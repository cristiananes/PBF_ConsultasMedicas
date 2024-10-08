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
                c.id,
                c.title,
                c.description,
                u.username AS author,
                c.createdAt
            FROM consults c
            INNER JOIN users u ON u.id = c.userId
            WHERE u.username LIKE ?
        `,
            // Si "place" o "author" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${place || ''}%`, `%${author || ''}%`]
        );


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
