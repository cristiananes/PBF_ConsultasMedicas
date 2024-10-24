// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

// Importamos las páginas.
import HomePage from './pages/HomePage';
import ConsultDetailPage from './pages/ConsultDetailPage.jsx';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewConsultPage from './pages/NewConsultPage.jsx';
import WorkerCreationPage from './pages/WorkerCreationPage.jsx';
import DoctorListPage from './pages/DoctorListPage';

// Aplicamos los estilos.
import './index.css';

import ConsultListPage from './pages/ConsultListPage.jsx';

// Inicializamos el componente principal.
const App = () => {
    return (
        <>
            <Header className="text-3xl font-bold underline" />

            {/* Este componente se encargará de renderizar los mensajes que queramos mostrar con react-hot-toast. */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />

            {/* Todas las rutas han de definirse dentro del componente <Routes>. */}
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/consults" element={<ConsultListPage />} />

                <Route
                    path="/consult/:consultId"
                    element={<ConsultDetailPage />}
                />
                <Route
                    path="/consult/new-consult"
                    element={<NewConsultPage />}
                />

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/doctorList" element={<DoctorListPage />} />
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
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
