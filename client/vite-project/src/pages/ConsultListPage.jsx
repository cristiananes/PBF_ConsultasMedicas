import { useConsults } from '../hooks/useConsults';
import { useDoctorData } from '../hooks/useDoctorData';
// Importamos el contexto.
/* import { AuthContext } from "../contexts/AuthContext"; */
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

// Importamos los componentes.
import { ButtonAction } from '../components/ButtonAction';
// Importamos los formularios.

// Inicializamos el componente.
const ConsultListPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    //Aqui tengo que extraer la lista de doctores del params
    const [consults, setConsutls] = useState([]);
    const [doctorData, setDoctorData] = useState([]);

    // Importamos los datos de los doctores.

    const fetchConsults = async () => {
        try {
            const response = await useConsults({ authToken });
            setConsutls(response);
        } catch (e) {
            toast.error(e.message);
        }
    };
    const fetchDoctorData = async () => {
        try {
            const response = await useDoctorData({ authToken });
            setDoctorData(response);
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        fetchConsults();
        fetchDoctorData();
    }, []);

    console.log('Consultas:', consults);

    return (
        consults && (
            <main>
                <h2>Listado de consultas</h2>

                <NavLink to="/user/:userId">
                    <ButtonAction text="Volver a perfil" />
                </NavLink>

                <ul>
                    {consults
                        .filter((consult) => {
                            // Si el usuario es un paciente, se filtran solo las consultas que ha creado.
                            if (authUser.role === 'patient') {
                                return consult.author === authUser.username;
                            }
                            // Si el usuario es un doctor, se filtran solo las consultas donde doctorId no sea null.
                            else if (authUser.role === 'doctor') {
                                return consult.doctorId !== null;
                            }
                            // Si el usuario es un admin, no se aplica ningún filtro.
                            return true;
                        })
                        .map((consult) => (
                            <li key={consult.id}>
                                <h3>{consult.title}</h3>
                                <h3>{consult.description}</h3>

                                <h3>{consult.author}</h3>
                            </li>
                        ))}
                </ul>
                <aside>
                    <NavLink to="/consult/new-consult">
                        <ButtonAction text="Añadir consulta" />
                    </NavLink>
                </aside>
            </main>
        )
    );
};

export default ConsultListPage;
