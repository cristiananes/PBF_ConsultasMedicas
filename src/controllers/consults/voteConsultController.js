// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite votar una respuesta.
const voteconsultController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la respuesta que queremos votar.
        const { replyId } = req.params; // Cambiado a replyId

        // Obtenemos los datos del body.
        const { value } = req.body;

        // Si faltan campos lanzamos un error.
        if (!value) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Convertimos el valor de string a número.
        const numericValue = Number(value);

        // Array de votos válidos.
        const validVotes = [1, 2, 3, 4, 5];

        // Si el valor del voto no es correcto lanzamos un error.
        if (!validVotes.includes(numericValue)) {
            generateErrorUtil(
                'Solo se admiten valores enteros comprendidos entre el 1 y el 5',
                400
            );
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Comprobamos si la respuesta existe.
        const [answer] = await pool.query(
            `SELECT consultId FROM answers WHERE id = ?`,
            [replyId] // Cambiado a replyId
        );

        // Verificamos que la respuesta existe.
        if (answer.length === 0) {
            generateErrorUtil('Respuesta no encontrada', 404);
        }

        // Comprobamos si el usuario es el titular de la consulta.
        const [consult] = await pool.query(
            `SELECT userId FROM consults WHERE id = ?`,
            [answer[0].consultId]
        );

        // Verificamos que el usuario que vota sea el titular de la consulta.
        if (consult[0].userId !== req.user.id) {
            generateErrorUtil(
                'No tienes permiso para votar esta respuesta',
                403
            );
        }

        // Comprobamos si existe un voto previo por parte del usuario.
        const [existingVote] = await pool.query(
            `SELECT id FROM answers WHERE userId = ? AND id = ?`,
            [req.user.id, replyId] // Cambiado a replyId
        );

        // Si ya existe un voto por parte del usuario, lanzamos un error.
        if (existingVote.length > 0) {
            generateErrorUtil('Ya has votado esta respuesta', 403);
        }

        // Insertamos o actualizamos el voto.
        await pool.query(
            `UPDATE answers SET rating = ?, voteTimestamp = NOW() WHERE id = ?`,
            [numericValue, replyId] // Cambiado a replyId
        );

        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Voto agregado',
        });
    } catch (err) {
        next(err);
    }
};

export default voteconsultController;
