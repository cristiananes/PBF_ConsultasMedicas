import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import '../ConsultsPage.css';

const consultas = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    consulta: 'Tengo dolor de cabeza desde hace dos días.',
    foto: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    nombre: 'María López',
    consulta: 'Me siento cansada todo el tiempo.',
    foto: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    nombre: 'Carlos García',
    consulta: 'Tengo una erupción en la piel.',
    foto: 'https://via.placeholder.com/150'
  }
];

const ConsultaItem = ({ consulta }) => {
  return (
    <div className="consulta-item">
      <img src={consulta.foto} alt={`Foto de ${consulta.nombre}`} />
      <div className="consulta-info">
        <h3>{consulta.nombre}</h3>
        <p>{consulta.consulta}</p>
        <button>Aceptar Consulta</button>
      </div>
    </div>
  );
};

const ConsultsPage = () => {
  return (
    <div className="consults-page">
      <h1>Consultas Médicas</h1>
      <div className="consulta-list">
        {consultas.map(consulta => (
          <ConsultaItem key={consulta.id} consulta={consulta} />
        ))}
      </div>
    </div>
  );
};

export default ConsultsPage;