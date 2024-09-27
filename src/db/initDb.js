// Añadimos la configuración del .env
import 'dotenv/config';

// Importamos la función que retorna el pool de conexiones
import getPool from './getPool.js';

// Generamos las tablas
const main = async () => {
    try {
        const pool = await getPool();

        console.log('Borrando tablas');

        // Eliminamos las tablas en el orden correcto
        await pool.query(
            'DROP TABLE IF EXISTS answers, consults, doctorData, specialities, users'
        );

        console.log('Creando tablas');

        // Creamos las tablas de manera individual
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(20) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                firstName VARCHAR(50) NOT NULL,
                lastName VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                avatar VARCHAR(100),
                role ENUM('admin', 'patient', 'doctor') DEFAULT 'patient',
                active BOOLEAN DEFAULT false,
                registrationCode CHAR(30),
                biography VARCHAR(500),
                createdBy VARCHAR(20),
                modifiedBy VARCHAR(20),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS specialities (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(20) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS doctorData (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                specialityId INT UNSIGNED NOT NULL,
                FOREIGN KEY (specialityId) REFERENCES specialities(id),
                experience CHAR(2),
                licenseNumber CHAR(9) NOT NULL,
                createdBy VARCHAR(20),
                modifiedBy VARCHAR(20),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS consults (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(300) NOT NULL,
                urgency ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
                doctorId INT UNSIGNED,
                    FOREIGN KEY (doctorId) REFERENCES users(id),
                file VARCHAR(100),
                userId INT UNSIGNED NOT NULL,
                    FOREIGN KEY (userId) REFERENCES users(id),
                specialityId INT UNSIGNED NOT NULL,
                    FOREIGN KEY (specialityId) REFERENCES specialities(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS answers (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                consultId INT UNSIGNED NOT NULL,
                FOREIGN KEY (consultId) REFERENCES consults(id),
                answerText VARCHAR(1000) NOT NULL,
                rating ENUM('1', '2', '3', '4', '5'),
                file VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        console.log('¡Tablas creadas!');

        // Inserción de las especialidades en la tabla "specialities"
        await pool.query(`
            INSERT INTO specialities (name)
            VALUES 
                ('Traumatologo'),
                ('Oculista'),
                ('Otorrino'),
                ('Pediatra'),
                ('Cardiologo'),
                ('Urologo'),
                ('Ginecologo'),
                ('Odontologo'),
                ('Neumologo'),
                ('Dermatologo'),
                ('Fisioterapeuta');
        `);

        console.log('¡Datos insertados en specialities!');

        // Inserción del usuario administrador
        const adminUser = process.env.ADMINUSER;
        const adminPass = process.env.ADMINPASS;
        const adminMail = process.env.ADMINMAIL;

        // Insertar el usuario administrador en la tabla "users"
        await pool.query(
            `
            INSERT INTO users (username, password, firstName, lastName, email, role, active)
            VALUES (?, ?, 'Admin', 'User', ?, 'admin', true)
        `,
            [adminUser, adminPass, adminMail]
        );

        console.log('¡Usuario administrador creado!');

        // Cerrar la conexión
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Llamamos a la función principal
main();
