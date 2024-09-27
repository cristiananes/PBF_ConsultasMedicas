// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite votar una entrada con un valor del 1 al 5.
const voteconsultController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada que queremos votar.
        const { consultId } = req.params;

        // Obtenemos los datos del body.
        const { value } = req.body;

        // Si faltan campos lanzamos un error.
        if (!value) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Array de votos válidos.
        const validVotes = [1, 2, 3, 4, 5];

        // Si el valor del voto no es correcto lanzamos un error.
        if (!validVotes.includes(value)) {
            generateErrorUtil(
                'Solo se admiten valores enteros comprendidos entre el 1 y el 5',
                400
            );
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Comprobamos si existen votos previos por parte del usuario.
        const [consultVotes] = await pool.query(
            `SELECT id FROM consultVotes WHERE userId = ? AND consultId = ?`,
            [req.user.id, consultId]
        );

        // Si ya existe un voto por parte del usuario lanzamos un error.
        if (consultVotes.length > 0) {
            generateErrorUtil('Ya has votado esta entrada', 403);
        }

        // Insertamos el voto.
        await pool.query(
            `INSERT INTO consultVotes(value, consultId, userId) VALUES(?, ?, ?)`,
            [value, consultId, req.user.id]
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