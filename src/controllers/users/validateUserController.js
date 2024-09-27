// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que activa un usuario con un código de registro.
const validateUserController = async (req, res, next) => {
    try {
        // Obtenemos el código de registro.
        const { validationCode } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Tratamos de obtener a un usuario con ese código de registro.
        const [users] = await pool.query(
            `SELECT id FROM users WHERE validationCode = ?`,
            [validationCode],
        );

        // Si no hay ningún usuario con ese código de registro lanzamos un error.
        if (users.length < 1) {
            generateErrorUtil('Código de registro inválido', 404);
        }

        // Validamos al usuario.
        await pool.query(
            `UPDATE users SET registrationCode = NULL, active = true WHERE validationCode = ?`,
            [validationCode],
        );

        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};

export default validateUserController;
