// Importamos el pool de conexiones a la base de datos
import getPool from '../../db/getPool.js'; // Asegúrate de que la ruta sea correcta para tu archivo de configuración de la base de datos.

const listSpecialitiesController = async (req, res, next) => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();
        // Consulta a la base de datos para obtener solo los nombres de las especialidades
        const [specialities] = await pool.query(
            'SELECT name FROM specialities'
        );



        // Verificamos si existen resultados
        if (specialities.length === 0) {
            return res.status(404).json({
                message: 'No hay especialidades disponibles',
            });
        }

        // Enviamos la lista de nombres de especialidades
        res.status(200).json({
            specialities: specialities.map((speciality) => speciality.name), // Solo devolvemos los nombres
        });
    } catch (err) {
        console.error(err);
        next(err); // Pasamos el error al middleware de manejo de errores
    }
};

export default listSpecialitiesController;
