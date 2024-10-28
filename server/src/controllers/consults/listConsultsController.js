// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const listconsultsController = async (req, res, next) => {
    try {
        // Obtenemos los query params necesarios.

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
                c.createdAt,
                c.doctorId,
                s.name AS speciality 
            FROM consults c
            INNER JOIN users u ON u.id = c.userId
            INNER JOIN specialities s ON s.id = c.specialityId 
            `
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
