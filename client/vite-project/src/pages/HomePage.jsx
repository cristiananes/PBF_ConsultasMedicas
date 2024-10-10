import React from 'react';
import { NavLink } from 'react-router-dom';

// Inicializamos el componente.
const HomePage = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      rating: 5,
      imgUrl: 'https://via.placeholder.com/80', // URL de la imagen del médico
    },
    {
      id: 2,
      name: 'Dra. María Gómez',
      rating: 4,
      imgUrl: 'https://via.placeholder.com/80', // URL de la imagen del médico
    },
    {
      id: 3,
      name: 'Dr. Luis Martínez',
      rating: 5,
      imgUrl: 'https://via.placeholder.com/80', // URL de la imagen del médico
    },
  ];

  return (
    <main style={styles.mainContainer}>
      {/* Encabezado */}
      <header style={styles.header}>
        <h1 style={styles.appTitle}>Consulta Médica</h1>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            <li style={styles.navItem}>
              <NavLink to="/consults" style={styles.navLink}>Ver Consultas</NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink to="/doctores" style={styles.navLink}>Encontrar Médicos</NavLink>
            </li>
            <li style={styles.navItem}>
              <NavLink to="/login" style={styles.navLink}>Iniciar Sesión</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Banner */}
      <section style={styles.banner}>
        <h2 style={styles.bannerTitle}>Bienvenidos a la Página de Consultas Médicas</h2>
        <p style={styles.bannerDescription}>
          Encuentra médicos destacados y agenda consultas de manera sencilla y rápida.
        </p>
      </section>

      {/* Médicos Destacados */}
      <div style={styles.doctorsContainer}>
        <h3 style={styles.subtitle}>Nuestros Médicos Destacados:</h3>
        <div style={styles.cardsContainer}>
          {doctors.map((doctor) => (
            <div key={doctor.id} style={styles.card}>
              <img src={doctor.imgUrl} alt={doctor.name} style={styles.img} />
              <h4 style={styles.doctorName}>{doctor.name}</h4>
              <div style={styles.ratingContainer}>
                {Array.from({ length: doctor.rating }, (_, i) => (
                  <span key={i} style={styles.star}>
                    ⭐
                  </span>
                ))}
                {Array.from({ length: 5 - doctor.rating }, (_, i) => (
                  <span key={i} style={styles.emptyStar}>
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Consulta Médica. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
};

// Estilos en línea
const styles = {
  mainContainer: {
    fontFamily: 'Arial, sans-serif',
    color: '#2C3E50',
    backgroundColor: '#E8F6F3', // Color de fondo en tonos verdes
    padding: '0',
    margin: '0',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#1ABC9C', // Color verde
    padding: '20px 0',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  appTitle: {
    margin: '0',
    fontSize: '2.5em',
    fontWeight: 'bold', // Letras en negrita
  },
  nav: {
    marginTop: '15px',
  },
  navList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#FFFFFF',
    fontSize: '1.2em',
    fontWeight: 'bold', // Letras en negrita
    transition: 'color 0.3s',
  },
  banner: {
    backgroundColor: '#A3D8D1', // Color verde suave
    padding: '40px 20px',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '20px 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  bannerTitle: {
    color: '#2C3E50',
    fontSize: '2.2em',
    margin: '0',
    fontWeight: 'bold', // Letras en negrita
  },
  bannerDescription: {
    fontSize: '1.4em',
    color: '#2C3E50',
    margin: '15px 0 0',
  },
  doctorsContainer: {
    marginTop: '40px',
  },
  subtitle: {
    color: '#1ABC9C',
    fontSize: '2em',
    textAlign: 'center',
    margin: '20px 0',
    fontWeight: 'bold', // Letras en negrita
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '10px', // Espacio entre tarjetas
    padding: '0 20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    padding: '10px',
    width: '130px', // Tarjeta más pequeña
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  img: {
    borderRadius: '50%',
    width: '60px', // Imagen más pequeña
    height: '60px',
    marginBottom: '10px',
  },
  doctorName: {
    fontSize: '1.1em', // Tamaño de letra más pequeño
    color: '#2C3E50',
    marginBottom: '10px',
    fontWeight: 'bold', // Letras en negrita
  },
  ratingContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  star: {
    color: '#FFD700',
    fontSize: '1.2em',
  },
  emptyStar: {
    color: '#e0e0e0',
    fontSize: '1.2em',
  },
  footer: {
    backgroundColor: '#1ABC9C',
    padding: '20px 0',
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
    width: '100%',
  },
  footerText: {
    margin: '0',
  },
};

// Exportamos el componente
export default HomePage;