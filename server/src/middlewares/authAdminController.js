// Importamos dependencias

// Importamos el util de generar error
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authAdminController = async (req, res, next) => {
    try {
        // Si existe autorización, intentamos verificar el token.

        // Comprobamos si el rol del usuario es "admin".
        if (req.user.role !== 'admin') {
            generateErrorUtil(
                'Acceso denegado: se requiere el rol de administrador',
                403
            );
        }

        // Si el rol es admin, continuamos con el siguiente middleware.
        next();
    } catch (err) {
        next(err);
    }
};

export default authAdminController;
