// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite responder a una consulta.
const replyConsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { consultId, answerText } = req.body;

        // Lanzamos un error si faltan campos.
        if (!consultId || !answerText) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Verificamos si la consulta existe.
        const [consult] = await pool.query(
            `SELECT * FROM consults WHERE id = ?`,
            [consultId]
        );

        // Si no encontramos la consulta, lanzamos un error.
        if (consult.length === 0) {
            generateErrorUtil('Consulta no encontrada', 404);
        }

        // Obtenemos el rol del usuario.
        const userRole = req.user.role; // Suponiendo que el rol del usuario se encuentra en req.user

        // Verificamos si el usuario es un doctor.
        if (userRole === 'doctor') {
            // Verificamos si la consulta ya tiene un doctor asignado.
            const existingDoctorId = consult[0].doctorId;

            // Si hay un doctor asignado y el doctor que intenta responder no es el mismo que ya está asignado ni el propietario de la consulta, lanzamos un error.
            if (
                existingDoctorId &&
                existingDoctorId !== req.user.id &&
                consult[0].userId !== req.user.id
            ) {
                generateErrorUtil(
                    'La consulta ya ha sido asignada a otro doctor',
                    403
                );
            }

            // Si no hay un doctor asignado, asignamos el ID del doctor a la consulta.
            if (!existingDoctorId) {
                await pool.query(
                    `UPDATE consults SET doctorId = ? WHERE id = ?`,
                    [req.user.id, consultId]
                );
            }
        }

        // Guardamos la respuesta en la base de datos en la tabla "answers".
        await pool.query(
            `INSERT INTO answers(consultId, answerText, userId) VALUES (?, ?, ?)`,
            [consultId, answerText, req.user.id]
        );

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Respuesta guardada',
        });
    } catch (err) {
        next(err);
    }
};

export default replyConsultController;
