// Importamos las dependencias.
import nodemailer from 'nodemailer';

// Importamos la función que genera un error.
import generateErrorUtil from './generateErrorUtil.js';

// Importas las variables de entorno necesarias.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

// Creamos un transporte (una conexión) para poder enviar el email.
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

// Función que envía un email a un correo electrónico dado.
const sendMailUtil = async (email, subject, body) => {
    try {
        // Enviamos el email.
        await transport.sendMail({
            from: SMTP_USER,
            to: email,
            subject,
            html: body,
        });
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al enviar email', 500);
    }
};

export default sendMailUtil;
