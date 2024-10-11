import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú desplegable
  const navigate = useNavigate(); // Hook para navegación

  const doctors = [
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      rating: 5,
      imgUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Dra. María Gómez',
      rating: 4,
      imgUrl: 'https://via.placeholder.com/80',
    },
    {
      id: 3,
      name: 'Dr. Luis Martínez',
      rating: 5,
      imgUrl: 'https://via.placeholder.com/80',
    },
  ];

  const services = [
    'Consulta General',
    'Especialista en Cardiología',
    'Especialista en Pediatría',
    'Radiología',
    'Consulta Online',
  ];

  const handleLogin = () => {
    navigate('/login'); // Redirige a la ruta de inicio de sesión
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Alterna el menú desplegable
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <main style={styles.mainContainer}>
      {/* Barra de búsqueda */}
      <header style={styles.header}>
        <input
          type="text"
          placeholder="Buscar médicos..."
          value={searchTerm}
          onChange={handleSearch}
          style={styles.searchInput}
        />

        {/* Botón de perfil con menú desplegable */}
        <div style={styles.profileMenu}>
          <img
            src="https://via.placeholder.com/40"
            alt="Perfil"
            style={styles.profileIcon}
            onClick={toggleMenu} // Al hacer clic se abre/cierra el menú
          />
          {menuOpen && (
            <div style={styles.dropdownMenu}>
              <NavLink to="/consultas" style={styles.dropdownItem}>
                Mis Consultas
              </NavLink>
              <NavLink to="/perfil" style={styles.dropdownItem}>
                Mi Perfil
              </NavLink>
              <NavLink to="/ajustes" style={styles.dropdownItem}>
                Ajustes
              </NavLink>
              <button onClick={handleLogin} style={styles.dropdownItem}>
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Contenedor principal con tres columnas */}
      <section style={styles.content}>
        {/* Columna Izquierda - Doctores */}
        <aside style={styles.leftColumn}>
          <h3 style={styles.subtitle}>Nuestros Doctores</h3>
          {doctors.map((doctor) => (
            <div key={doctor.id} style={styles.card}>
              <img src={doctor.imgUrl} alt={doctor.name} style={styles.img} />
              <h4 style={styles.doctorName}>{doctor.name}</h4>
              <div style={styles.ratingContainer}>
                {Array.from({ length: doctor.rating }, (_, i) => (
                  <span key={i} style={styles.star}>⭐</span>
                ))}
                {Array.from({ length: 5 - doctor.rating }, (_, i) => (
                  <span key={i} style={styles.emptyStar}>⭐</span>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* Columna Central - Solicitar Consulta */}
        <section style={styles.centerColumn}>
          <h3 style={styles.subtitle}>Solicitar una Consulta</h3>
          <form style={styles.consultationForm}>
            <input
              type="text"
              placeholder="Nombre del paciente"
              style={styles.formInput}
            />
            <input type="date" placeholder="Fecha" style={styles.formInput} />
            <textarea
              placeholder="Motivo de la consulta"
              style={styles.textArea}
            ></textarea>
            <button type="submit" style={styles.submitButton}>
              Pedir Consulta
            </button>
          </form>
        </section>

        {/* Columna Derecha - Servicios */}
        <aside style={styles.rightColumn}>
          <h3 style={styles.subtitle}>Nuestros Servicios</h3>
          <ul style={styles.servicesList}>
            {services.map((service, index) => (
              <li key={index} style={styles.serviceItem}>
                {service}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2024 Consulta Médica. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
};

// Estilos en línea
const styles = {
  mainContainer: {
    fontFamily: 'Arial, sans-serif',
    color: '#2C3E50',
    backgroundColor: '#E8F6F3',
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#1ABC9C',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFFFFF',
  },
  searchInput: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
  },
  profileMenu: {
    position: 'relative',
    display: 'inline-block',
  },
  profileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '50px',
    right: '0',
    backgroundColor: '#FFFFFF',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '180px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
  },
  dropdownItem: {
    display: 'block',
    padding: '10px 15px',
    color: '#2C3E50',
    textDecoration: 'none',
    fontSize: '1em',
    borderBottom: '1px solid #ccc',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    flex: 1,
  },
  leftColumn: {
    flex: '1',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginRight: '10px',
  },
  centerColumn: {
    flex: '2',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  consultationForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  formInput: {
    padding: '10px',
    fontSize: '1em',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textArea: {
    padding: '10px',
    fontSize: '1em',
    height: '100px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
  },
  submitButton: {
    backgroundColor: '#1ABC9C',
    color: '#FFFFFF',
    padding: '10px',
    border: 'none',
    fontSize: '1.2em',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  rightColumn: {
    flex: '1',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  servicesList: {
    listStyle: 'none',
    padding: '0',
  },
  serviceItem: {
    marginBottom: '10px',
    fontSize: '1.1em',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    textAlign: 'center',
    marginBottom: '15px',
  },
  img: {
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    marginBottom: '10px',
  },
  doctorName: {
    fontSize: '1.1em',
    color: '#2C3E50',
    marginBottom: '10px',
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  star: {
    color: '#FFD700',
    fontSize: '1.2em',
  },
  footer: {
    backgroundColor: '#1ABC9C',
    padding: '20px 0',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  footerText: {
    margin: '0',
  },
};

export default HomePage;
