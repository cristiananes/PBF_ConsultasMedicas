import { useDoctors } from '../hooks/useDoctors';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import SearchComponent from '../components/SearchComponent';
import { Navigate } from 'react-router-dom';

// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    //Aqui tengo que extraer la lista de doctores del params
    const [doctors, setDoctors] = useState([]);
    // Importamos los datos de los doctores.
    //saco las variables

    const fetchDoctors = async () => {
        try {
            const response = await useDoctors({ authToken });
            setDoctors(response);
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Si el usuario no tiene token, lo enviamos a la página de login
    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <h2>Listado de medicos</h2>

            {/* Establecemos las fotos. */}
            <SearchComponent />
        </main>
    );
};

export default DoctorListPage;
