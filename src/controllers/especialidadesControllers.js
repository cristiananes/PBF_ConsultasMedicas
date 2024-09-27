const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Lista de especialidades médicas
const especialidades = [
    'Traumatologo',
    'Oculista',
    'Otorrino',
    'Pediatra',
    'Cardiologo',
    'Urologo',
    'Ginecologo',
    'Odontologo',
    'Neumologo',
    'Dermatologo',
    'Fisioterapeuta'
];

// Datos de usuario (ejemplo)
let usuario = {
    email: 'usuario@example.com',
    username: 'usuario123',
    nombre: 'Juan',
    apellido: 'Pérez',
    contraseña: 'contraseñaSegura',
    biografia: 'Médico con experiencia en diversas áreas.',
    avatar: 'url_del_avatar',
    especialidad: 'Traumatologo',
    añosExperiencia: 5,
    mediaRating: 4.5 // Este campo no es modificable
};

// Endpoint para obtener la lista de especialidades
app.get('/especialidades', (req, res) => {
    res.json(especialidades);
});

// Endpoint para obtener datos del usuario
app.get('/usuario', (req, res) => {
    const { mediaRating, ...datosUsuario } = usuario; // Excluir mediaRating
    res.json(datosUsuario);
});

// Endpoint para editar datos del usuario
app.put('/usuario', (req, res) => {
    const { email, username, nombre, apellido, contraseña, biografia, avatar, especialidad, añosExperiencia } = req.body;

    // Actualizar solo los campos permitidos
    if (email) usuario.email = email;
    if (username) usuario.username = username;
    if (nombre) usuario.nombre = nombre;
    if (apellido) usuario.apellido = apellido;
    if (contraseña) usuario.contraseña = contraseña; // Considerar encriptar la contraseña en un caso real
    if (biografia) usuario.biografia = biografia;
    if (avatar) usuario.avatar = avatar;
    if (especialidad && especialidades.includes(especialidad)) usuario.especialidad = especialidad;
    if (añosExperiencia) usuario.añosExperiencia = añosExperiencia;

    res.json({ message: 'Datos actualizados exitosamente', usuario });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});