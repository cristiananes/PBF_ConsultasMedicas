<<<<<<< HEAD
// Inicializamos el componente.
const HomePage = () => {
  return (
    <main>
      <h1>Pagina provisional</h1>
=======
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
>>>>>>> b210575 (Hooks, forms y cambios varios)
    </main>
  );
};

<<<<<<< HEAD
export default HomePage;
=======
export default HomePage;
>>>>>>> b210575 (Hooks, forms y cambios varios)
