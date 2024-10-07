// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que elimina un archivo.
import removeFileUtil from '../../utils/removeFileUtil.js';

// Función controladora que elimina una entrada concreta por ID.
const deleteConsultController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada a eliminar.
        const { consultId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Buscamos la consulta por ID para verificar su existencia y obtener el archivo asociado (si lo tiene).
        const [consult] = await pool.query(
            `SELECT file FROM consults WHERE id = ?`,
            [consultId]
        );

        // Verificamos si la consulta existe.
        if (consult.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'La consulta no existe',
            });
        }

        // Si la consulta tiene un archivo asociado, lo eliminamos.
        const fileName = consult[0].file;
        if (fileName) {
            // Eliminamos el archivo utilizando removeFileUtil (la función ya maneja la ruta)
            await removeFileUtil(fileName);
        }

        // Eliminamos la consulta.
        await pool.query(`DELETE FROM consults WHERE id = ?`, [consultId]);

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Consulta eliminada',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteConsultController;
