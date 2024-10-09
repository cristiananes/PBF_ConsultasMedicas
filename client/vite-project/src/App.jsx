// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importamos las páginas.
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';

// Aplicamos los estilos.
import './index.css';

// Inicializamos el componente principal.
const App = () => {
  return (
    <>
      <Header />

      {/* Este componente se encargará de renderizar los mensajes que queramos mostrar
                con react-hot-toast. */}
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 5000,
        }}
      />

      {/* Todas las rutas han de definirse dentro del compontente <Routes>. */}
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/user/validate/:registrationCode'
          element={<ActivateUserPage />}
        />
        <Route path='/login' element={<LoginPage />} />
        {/* <Route path='*' element={<NotFoundPage />} /> */}
      </Routes>

      <Footer />
    </>
  );
};

export default App;
