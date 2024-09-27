// Importamos dependencias
import jwt from 'jsonweb';

// Importamos el util de generar error
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserController = async (req, res, next) => {
    try {
        // Comprobamos si existe autorización y generamos error en caso contrario.
        const { authorization } = req.headers;
        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autorización', 401);
        }
        // Si existe autorización, creamos el token de usuario
        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = tokenInfo;
            next();
        } catch (err) {
            console.error(err);
            generateErrorUtil('Token invalido', 401);
        }
    } catch (err) {
        next(err);
    }
};

export default authUserController;
