// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto en disco.
import saveFileUtil from '../../utils/saveFileUtil.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';


// Función controladora que permite crear una nueva entrada.
const newconsultController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios.
        const { title, description, urgency, specialtyName } = req.body;
        console.log(title + " : titulo");
        console.log(description + " :descripcion");
        console.log(urgency + ": urgency");
        console.log(specialtyName + " : specialytyname");



        const userId = req.user.id;
        const userRole = req.user.role;
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        if (userRole != "patient") {
            generateErrorUtil("Solo los pacientes pueden añadir consultas", 403);

        }
        const [specialty] = await pool.query(
            `SELECT id FROM specialities WHERE name = ?`,
            [specialtyName]
        );
        console.log(specialty + " :esta es la especialidad ");




        // Lanzamos un error si faltan campos.
        if (!title || !description || !urgency || !specialty) {
            generateErrorUtil('Faltan campos', 400);
        }



        // Guardamos la entrada (sin los archivos).
        await pool.query(
            `INSERT INTO consults( title, description, urgency, specialityId, userId) VALUES (?, ?, ?, ?,?)`,
            [title, description, urgency, specialty[0].id, userId]
        );

        const file = req.files?.file;
        console.log(file);

        if (file) {
            console.log("entra a guardar el file")
            // Guardamos la foto en la carpeta de subida de archivos.
            const fileName = await saveFileUtil(file, 1000);

            // Guardamos la foto en la base de datos.
            await pool.query(
                `INSERT INTO consults(file) VALUES(?)`,
                [fileName]
            );

        }
        // Enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Entrada creada',
        });
    } catch (err) {
        next(err);
    }
};

export default newconsultController;
