import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getPool from '../../utils/generateErrorUtil.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';
const loginUserController = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            generateErrorUtil('Faltan campos', 400);
        }
        const pool = await getPool();
        const [users] = await pool.query(
            'SELECT id, password, role, active from users WHERE username = ?',
            username
        );
        const validPass =
            users.length > 0 &&
            (await bcrypt.compare(password, users[0].password));
        if (!validPass) {
            generateErrorUtil('Credenciales invalidas', 401);
        }
        if (!users[0].active) {
            generateErrorUtil(
                'Usuario pendiente de activar. Por favor, activa tu usuario accediento al email de verificación que has recibido en tu correo',
                403
            );
        }
        const tokenInfo = {
            id: users[0].id,
            role: users[0].role,
        };
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });
        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};
export default loginUserController;
