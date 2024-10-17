// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const getReplyByConsultIdController = async (req, res, next) => {
    try {
        const { consultId } = req.params;

        const pool = await getPool();

        // Consulta para obtener las respuestas de la tabla 'answers'
        const [answers] = await pool.query(
            `
            SELECT 
            a.id, 
            a.userId, 
            a.consultId, 
            a.answerText, 
            a.rating, 
            a.file, 
            a.createdAt,
            u.username AS author
            FROM answers a
            INNER JOIN users u ON a.userId = u.id   
            WHERE a.consultId = ?
            `,
            [consultId]
        );

        // Verifica si hay respuestas
        if (answers.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontraron respuestas para esta consulta',
            });
        }

        // Enviar las respuestas encontradas
        res.send({
            status: 'ok',
            data: {
                answers,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getReplyByConsultIdController;
