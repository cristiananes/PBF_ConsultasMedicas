// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const listMedicsController = async (req, res, next) => {
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
            INNER JOIN doctorData d on u.id = d.userId
            WHERE u.firstName LIKE ? OR u.lastName LIKE ?
        `,
            // Si "firstname" o "lastname" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${firstName || ''}%`, `%${lastName || ''}%`],
        );



        // Enviamos una respuesta al cliente.
        res.sed({
            status: 'ok',
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listMedicsController;
