import { useDoctors } from '../hooks/useDoctors';
// Importamos el contexto.
/* import { AuthContext } from "../contexts/AuthContext"; */
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
/* import { Navigate } from "react-router-dom"; */

// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
    const { authToken } = useContext(AuthContext);
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

    // Declaramos una variable para indicar cuando estamos haciendo fetch al servidor y poder
    // deshabilitar así los botones durante ese proceso.

    /*   if (!authUser) {
    return <Navigate to="/login" />;
  } */

    return (
        doctors && (
            <main>
                <h2>Listado de medicos</h2>

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
            </main>
        )
    );
};

export default DoctorListPage;
