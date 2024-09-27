// Importamos las dependencias necesarias.
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite registrar a un administrador.
const adminRegisterController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const {
            username,
            email,
            firstName,
            lastName,
            password,
            specialty,
            experience,
            licenseNumber,
            role,
        } = req.body;

        // Validamos que los campos estén presentes.
        if (
            !username ||
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !specialty ||
            !experience ||
            !licenseNumber ||
            !role
        ) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Verificamos si el username ya existe.
        let [users] = await pool.query(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );
        if (users.length > 0) {
            generateErrorUtil('El nombre de usuario ya existe', 409);
        }

        // Verificamos si el email ya existe.
        [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [
            email,
        ]);
        if (users.length > 0) {
            generateErrorUtil('El correo electrónico ya está en uso', 409);
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos al nuevo administrador en la tabla 'users' con rol de 'admin'.
        await pool.query(
            `INSERT INTO users (username, email, firstName, lastName, specialty, experience, licenseNumber, password, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                username,
                email,
                firstName,
                lastName,
                specialty,
                experience,
                licenseNumber,
                password,
                hashedPass,
                role,
            ]
        );

        // Enviamos una respuesta de éxito al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Administrador registrado con éxito',
        });
    } catch (err) {
        next(err);
    }
};

export default adminRegisterController;
