// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const getconsultByIdController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada.
        const { consultId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos la entrada con el ID proporcionado, incluyendo los detalles del usuario, la especialidad y el médico.
        const [consults] = await pool.query(
            `
            SELECT  
                c.id,
                c.title,
                c.description,
                c.urgency,
                c.file,
                s.name AS specialityName,
                u.firstName AS patientFirstName,
                u.lastName AS patientLastName,
                u.username AS author,
                c.createdAt,
                d.firstName AS doctorFirstName,
                d.lastName AS doctorLastName
            FROM consults c
            INNER JOIN users u ON u.id = c.userId
            INNER JOIN specialities s ON s.id = c.specialityId
            LEFT JOIN users d ON d.id = c.doctorId  -- LEFT JOIN para obtener los datos del doctor
            WHERE c.id = ?
            `,
            [consultId]
        );

        // Verificamos si se encontró la consulta.
        if (consults.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'Consulta no encontrada',
            });
        }

        // Preparamos el objeto de respuesta.
        const consult = {
            ...consults[0],
        };

        // Si el médico no está asignado, borramos sus datos de la respuesta
        if (!consult.doctorFirstName || !consult.doctorLastName) {
            // Eliminamos los campos del médico si no están presentes.
            delete consult.doctorFirstName;
            delete consult.doctorLastName;
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                consult,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getconsultByIdController;
