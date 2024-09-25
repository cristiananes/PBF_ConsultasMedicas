import jwt from 'jsonweb';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autorización', 401);
        }
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
