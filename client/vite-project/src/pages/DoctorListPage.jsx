import { fetchDoctors } from '../hooks/fetchDoctors';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
// Importamos moment para manipular fechar.
import { useContext } from 'react';
import { SearchComponent } from '../components/SearchComponent';
// import SearchComponent from '../components/SearchComponent';
import { Navigate } from 'react-router-dom';

// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
    const { authUser } = useContext(AuthContext);

    fetchDoctors();

    // Si el usuario no tiene token, lo enviamos a la página de login
    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <h2>Listado de medicos</h2>

            <SearchComponent />
        </main>
    );
};

export default DoctorListPage;
