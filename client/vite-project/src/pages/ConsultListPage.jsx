import { Link } from 'react-router-dom';
import { useConsults } from '../hooks/useConsults';
import { useDoctorData } from '../hooks/useDoctorData';
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
import { H2 } from '../components/H2';
import { Label } from '../components/Label';

const ConsultListPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    const [consults, setConsults] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [showUnassigned, setShowUnassigned] = useState(false);

    // Fetch de las consultas.
    const fetchConsults = async () => {
        try {
            const response = await useConsults({ authToken });
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

    return (
        consults && (
            <main className="flex flex-col items-center justify-center bg-[url('/public/fondoaz.jpg')] bg-cover bg-center min-h-screen py-10">
                <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 bg-opacity-90 ">
                    <H2 text="Listado de consultas" />

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
                                    <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 bg-opacity-90 ">
                                        <h3>
                                            <Label text="Asunto:" />{' '}
                                            {consult.title}
                                        </h3>
                                        <h3>
                                            <Label text="Descripción:" />{' '}
                                            {consult.description}
                                        </h3>
                                        <h3>
                                            <Label text="Paciente:" />{' '}
                                            {consult.author}
                                        </h3>
                                    </div>

                                    <Link to={`/consult/${consult.id}`}>
                                        <button
                                            type="button"
                                            className="bg-black mb-5 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
                                        >
                                            Ver consulta
                                        </button>
                                    </Link>
                                </li>
                            ))}
                    </ul>

                    {/* Sidebar con opciones adicionales */}
                    <aside>
                        {/* Mostrar botón de añadir consulta solo para pacientes */}
                        {authUser && authUser.role === 'patient' && (
                            <NavLink
                                to={`/user/${authUser ? authUser.id : ''}`}
                            >
                                <button
                                    type="button"
                                    className="bg-blue-500 ml-60 mb-5 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
                                >
                                    Volver a perfil
                                </button>
                            </NavLink>
                        )}
                        <NavLink to="/consult/new-consult">
                            <button
                                type="button"
                                className="bg-green-500 ml-20 mr-0 mb-5 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
                            >
                                Crear nueva consulta
                            </button>
                        </NavLink>
                    </aside>
                </div>
            </main>
        )
    );
};

export default ConsultListPage;
