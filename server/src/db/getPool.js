// Accedemos a las variables de entorno personalizadas
import 'dotenv/config';

// Importamos la version asyn del modulo mysql2
import mysql from 'mysql2/promise';

// Obtenemos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenara un grupo de conexiones con la db
let pool;

// Funcion que retornara el pool
const getPool = async () => {
    try {
        // Si no existe un "pool" de conexiones lo creamos
        if (!pool) {
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
            });

            // Con la conexión anterior creamos la base de datos si no existe.
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                //crear la base de datos y ponerla
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return await pool;
    } catch (err) {
        console.error(err);
    }
};

//exportamos la funcion anterior
export default getPool;
