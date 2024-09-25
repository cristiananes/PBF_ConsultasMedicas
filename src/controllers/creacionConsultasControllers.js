const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let consultas = []; // Array para almacenar las consultas

app.post('/api/consultas', (req, res) => {
    const { titulo, descripcion, foto, especialidad, medico, gravedad } = req.body;

    // Validar especialidad
    const especialidadesValidas = [
        'Traumatologo', 'Oculista', 'Otorrino', 'Pediatra',
        'Cardiologo', 'Urologo', 'Ginecologo', 'Odontologo',
        'Neumologo', 'Dermatologo', 'Fisioterapeuta'
    ];

    if (!especialidadesValidas.includes(especialidad)) {
        return res.status(400).json({ mensaje: 'Especialidad no válida' });
    }

    const nuevaConsulta = {
        id: consultas.length + 1,
        titulo,
        descripcion,
        foto,
        especialidad,
        medico,
        gravedad
    };

    consultas.push(nuevaConsulta);
    res.status(201).json({ mensaje: 'Consulta creada exitosamente', consultaId: nuevaConsulta.id });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});