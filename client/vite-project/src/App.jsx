// Importamos los componentes.
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Importamos las páginas.

import HomePage from './pages/HomePage';
import ConsultDetail from './pages/ConsultDetailDoctor.jsx';
import DoctorConsultsPage from './pages/DoctorConsultsList.jsx';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
<<<<<<< HEAD
import UserProfilePage from './pages/UserProfilePage.jsx';
import NewConsultPage from './pages/newConsultPage.jsx';
import DoctorListPage from "./pages/DoctorListPage";


// Aplicamos los estilos.

import "./index.css";
import NotFoundPage from "./pages/NotFoundPage.jsx";
=======
import UserProfilePage from './pages/UserProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';

// Aplicamos los estilos.

import './index.css';


>>>>>>> b210575 (Hooks, forms y cambios varios)

// Inicializamos el componente principal.
const App = () => {
  return (
    <>
      <Header className="text-3xl font-bold underline" />

      {/* Este componente se encargará de renderizar los mensajes que queramos mostrar
                con react-hot-toast. */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />

      {/* Todas las rutas han de definirse dentro del compontente <Routes>. */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctorConsults" element={<DoctorConsultsPage />} />
        <Route path='/consultPage' element={<ConsultDetail />} />
        <Route path='/consult/new-consult' element={<NewConsultPage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/doctorList" element={<DoctorListPage />} />
        <Route path="/*" element={<NotFoundPage />} />
       

        <Route
          path="/user/validate/:registrationCode"
          element={<ActivateUserPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:userId" element={<UserProfilePage />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
