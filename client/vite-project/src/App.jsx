// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { ButtonAction } from './components/ButtonAction.jsx';
import { H2 } from './components/H2.jsx';
import { Label } from './components/Label.jsx';

// Importamos las páginas.

import HomePage from './pages/HomePage';
import ConsultDetail from './pages/ConsultDetail.jsx';
import DoctorConsultsPage from './pages/DoctorConsultsList.jsx';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewConsultPage from './pages/newConsultPage.jsx';
import WorkerCreationPage from './pages/WorkerCreationPage.jsx';
import DoctorListPage from './pages/DoctorListPage';

// Aplicamos los estilos.

import './index.css';

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
                <Route
                    path="/doctorConsults"
                    element={<DoctorConsultsPage />}
                />
                <Route path="/consultPage" element={<ConsultDetail />} />
                <Route
                    path="/consult/new-consult"
                    element={<NewConsultPage />}
                />
                <Route path="/*" element={<NotFoundPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/admin-register"
                    element={<WorkerCreationPage />}
                />
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
