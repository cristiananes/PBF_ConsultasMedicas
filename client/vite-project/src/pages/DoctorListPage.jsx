import { useDoctors } from '../hooks/useDoctors';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { Navigate } from 'react-router-dom';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
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
        doctors && (
            <MainContainer>
                <Whiteboxanim>
                    <H2 text="Listado de medicos" />

                    {/* Establecemos las fotos. */}

                    <ul>
                        {doctors.map((doctor) => (
                            <li key={doctor.id}>
                                <h3>{doctor.firstName}</h3>
                                <h3>A{doctor.lasName}</h3>
                                <h3>{doctor.userName}</h3>
                                <h3>{doctor.email}</h3>
                                <p>{doctor.specialty}</p>
                            </li>
                        ))}
                    </ul>
                </Whiteboxanim>
            </MainContainer>
        )
    );
};

export default DoctorListPage;
