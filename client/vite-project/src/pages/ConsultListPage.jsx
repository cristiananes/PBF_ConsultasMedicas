import { Link } from 'react-router-dom';
import { useConsults } from '../hooks/useConsults';
import { useDoctorData } from '../hooks/useDoctorData';
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';

const ConsultListPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    const [consults, setConsults] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [showUnassigned, setShowUnassigned] = useState(false);

    // Fetch de las consultas.
    const fetchConsults = async () => {
        try {
            const response = await useConsults({ authUser, authToken });
            setConsults(response);
        } catch (e) {
            toast.error(e.message);
        }
    };

    // Fetch de los datos de los doctores.
    const fetchDoctorData = async () => {
        try {
            const response = await useDoctorData({ authToken });
            setDoctorData(response);
        } catch (e) {
            toast.error(e.message);
        }
    };
    console.log(setDoctorData);

    useEffect(() => {
        fetchConsults();
        fetchDoctorData();
    }, [authToken]);

    // Función para alternar el filtro de consultas no asignadas
    const toggleUnassignedFilter = () => {
        setShowUnassigned((prev) => {
            const newValue = !prev;
            console.log('showUnassigned cambiado a:', newValue); // Verifica el cambio
            return newValue;
        });
    };

    // Si el usuario no tiene token, lo enviamos a la página de login
    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        consults && (
            <main>
                <h2>Listado de consultas</h2>

                {/* Botón solo visible para doctores para ver consultas no asignadas */}
                {authUser && authUser.role === 'doctor' && (
                    <ButtonAction
                        text={
                            showUnassigned
                                ? 'Ver consultas asignadas'
                                : 'Ver consultas no asignadas'
                        }
                        onClick={toggleUnassignedFilter}
                    />
                )}

                <ul>
                    {consults
                        .filter((consult) => {
                            if (authUser.role === 'patient') {
                                // Filtra las consultas que el paciente ha creado
                                return consult.author === authUser.username;
                            } else if (authUser.role === 'doctor') {
                                // Filtra las consultas no asignadas si el filtro está activo
                                if (showUnassigned) {
                                    return consult.doctorId === null;
                                }
                                // Si no se filtran las no asignadas, muestra todas las consultas asignadas
                                return consult.doctorId !== null;
                            }
                            return true; // Admin o cualquier otro rol ve todas las consultas
                        })
                        .map((consult) => (
                            <li key={consult.id}>
                                <h3>Asunto: {consult.title}</h3>
                                <h3>Descripción: {consult.description}</h3>
                                <h3>Paciente: {consult.author}</h3>

                                <Link to={`/consult/${consult.id}`}>Ver</Link>
                            </li>
                        ))}
                </ul>

                {/* Sidebar con opciones adicionales */}
                <aside>
                    {/* Mostrar botón de añadir consulta solo para pacientes */}
                    {authUser && authUser.role === 'patient' && (
                        <NavLink to="/consult/new-consult">
                            <ButtonAction text="Añadir consulta" />
                        </NavLink>
                    )}
                    <NavLink to={`/user/${authUser ? authUser.id : ''}`}>
                        <ButtonAction text="Volver a perfil" />
                    </NavLink>
                </aside>
            </main>
        )
    );
};

export default ConsultListPage;
