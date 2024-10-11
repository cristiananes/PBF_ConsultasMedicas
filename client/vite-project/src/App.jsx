// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importamos las páginas.

import HomePage from './pages/HomePage';
import ConsultDetail from './pages/ConsultDetail';
import DoctorConsultsPage from './pages/DoctorConsults';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage.jsx';

// Aplicamos los estilos.

import './index.css';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Inicializamos el componente principal.
const App = () => {
  return (
    <>
      <Header className='text-3xl font-bold underline' />

      {/* Este componente se encargará de renderizar los mensajes que queramos mostrar
                con react-hot-toast. */}
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 5000,
        }}
      />
      <div className='App'>
        <ConsultDetail />
      </div>
      {/* Todas las rutas han de definirse dentro del compontente <Routes>. */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/DoctorConsults' element={<DoctorConsultsPage />} />
        <Route path='/consultPage' element={<ConsultDetail />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route
          path='/user/validate/:registrationCode'
          element={<ActivateUserPage />}
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/:userId' element={<UserProfilePage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
