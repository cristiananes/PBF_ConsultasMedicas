// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de doctores.
const listMedicsController = async (req, res, next) => {
    try {
        // Obtenemos los query params necesarios.
        let { firstName, lastName } = req.query;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de doctores.
        const [users] = await pool.query(
            `
            SELECT  
             u.id, 
             u.username, 
             u.firstName, 
             u.lastName, 
             u.email, 
             s.name AS specialty,  
             d.experience
            FROM users u
            INNER JOIN doctorData d ON u.id = d.userId
            INNER JOIN specialities s ON d.specialityId = s.id  
            WHERE  u.role = 'doctor' 
        `,
            // Si "firstName" o "lastName" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${firstName || ''}%`, `%${lastName || ''}%`]
        );
        console.log(users);

        // Enviamos una respuesta al cliente.
        res.send({
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
