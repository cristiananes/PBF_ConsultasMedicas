// Importamos dependencias
import jwt from 'jsonwebtoken';

// Importamos el util de generar error
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authAdminController = async (req, res, next) => {
    try {
        // Comprobamos si existe autorización y generamos error en caso contrario.
        const { authorization } = req.headers;
        if (!authorization) {
            return generateErrorUtil('Falta la cabecera de autorización', 401);
        }

        // Si existe autorización, intentamos verificar el token.
        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = tokenInfo;

            // Comprobamos si el rol del usuario es "admin".
            if (req.user.role !== 'admin') {
                return generateErrorUtil(
                    'Acceso denegado: se requiere el rol de administrador',
                    403
                );
            }

            // Si el rol es admin, continuamos con el siguiente middleware.
            next();
        } catch (err) {
            console.error(err);
            return generateErrorUtil('Token inválido', 401);
        }
    } catch (err) {
        next(err);
    }
};

export default authAdminController;
