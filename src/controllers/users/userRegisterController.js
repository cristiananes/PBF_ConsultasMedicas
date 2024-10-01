// Importamos las dependencias necesarias.
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

// Función controladora que permite crear un usuario.
const userRegisterController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { firstName, lastName, username, email, password, biography } =
            req.body;
        // Si falta algún campo lanzamos un error.
        if (!firstName || !lastName || !username || !email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();
        // Obtenemos el listado de usuarios con el nombre de usuario recibido.
        let [users] = await pool.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );

        // Si existe algún usuario con ese nombre de usuario lanzamos un error.
        if (users.length > 0) {
            generateErrorUtil('El nombre de usuario ya existe', 409);
        }
        // Obtenemos el listado de usuarios con el email de usuario recibido.
        [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
            email,
        ]);

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            generateErrorUtil('Email no disponible', 409);
        }
        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Creamos un código de registro.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Insertamos el usuario.
        await pool.query(
            `INSERT INTO users(firstName, lastName, username, email, password, biography, registrationCode) VALUES(?, ?, ?, ?, ?, ?, ?)`,
            [
                firstName,
                lastName,
                username,
                email,
                hashedPass,
                biography,
                registrationCode,
            ]
        );

        // Asunto y cuerpo del email de verificación.
        const emailSubject = 'Activa tu usuario en consultasmedicas';
        const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Consultas Medicas (estas a salvo). Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="${process.env.CLIENT_URL}/api/users/validate/${registrationCode}">¡Activa tu usuario!</a>
        `;
        await sendMailUtil(email, emailSubject, emailBody);
        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

export default userRegisterController;
