// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que retorna info privada del médico.
const doctorDetailsController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario desde los parámetros.
        const { userId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario, asegurando que sea un doctor.
        const [users] = await pool.query(
            `SELECT  
            u.id,
            
            u.username, 
            u.firstName, 
            u.lastName, 
            u.email, 
            s.name AS specialty,  
            d.experience,
            u.avatar
            FROM users u
            INNER JOIN doctorData d ON u.id = d.userId
            INNER JOIN specialities s ON d.specialityId = s.id
            WHERE u.id = ?`,
            [userId]
        );

        // Lanzamos un error si el usuario no existe o no es un doctor.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado o no es un doctor', 404);
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                user: users[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default doctorDetailsController;
