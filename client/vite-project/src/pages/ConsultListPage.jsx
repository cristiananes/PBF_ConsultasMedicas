import { Link } from 'react-router-dom';
import { useContext, useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';

const { VITE_API_URL } = import.meta.env;

import { useParams } from 'react-router-dom';


import { H2 } from '../components/H2';
import { Label } from '../components/Label';
import MainContainer from '../components/Main';
import Whitebox from '../components/Whitebox';


const ConsultListPage = () => {
    const { authToken, authUser } = useContext(AuthContext);
    const [consults, setConsults] = useState([]);
    const [doctorData, setDoctorData] = useState(null);
    const [showUnassigned, setShowUnassigned] = useState(false);

    // Fetch de las consultas.
    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/consults`, {
                    method: 'GET',
                    headers: {
                        Authorization: authToken,
                    },
                });
                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setConsults(body.data.consults);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchConsults();
    }, [authToken]);

    // Fetch de los datos de los doctores.
    useEffect(() => {
        if (!authUser.id || authUser.role !== 'doctor' || !authToken) return;

        const fetchDoctorData = async () => {
            try {
                const userId = authUser.id;
                const res = await fetch(
                    `${VITE_API_URL}/api/doctor/${userId}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                const body = await res.json();

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setDoctorData(body.data.user);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchDoctorData();
    }, [authUser?.id, authUser?.role, authToken]);

  

    // Función para alternar el filtro de consultas no asignadas
    const toggleUnassignedFilter = () => {
        setShowUnassigned((prev) => !prev);
    };

    // Filtrado de consultas
    const filteredConsults = useMemo(() => {
        console.log('bbbbbbbbbbbbbbbbbbb');
        if (!doctorData && authUser.role !== 'patient') return consults;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa');

        return consults.filter((consult) => {
            if (authUser.role === 'patient') {
                console.log(
                    'autor: ',
                    consult.author,
                    'usuario: ',
                    authUser.username
                );

                return consult.author === authUser.username;
            } else if (authUser.role === 'doctor') {
                if (showUnassigned) {
                    return (
                        consult.doctorId === null &&
                        consult.speciality === doctorData.specialty
                    );
                } else {
                    return (
                        consult.doctorId === doctorData.id &&
                        consult.speciality === doctorData.specialty
                    );
                }
            }
            return true;
        });
    }, [consults, authUser, doctorData, showUnassigned]);

    return (

        consults && (
            <MainContainer>
                <Whitebox>
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

                                    <h3>Asunto: {consult.title}</h3>
                                    <h3>Descripción: {consult.description}</h3>
                                    <h3>Paciente: {consult.author}</h3>

                                    <Link to={`/consult/${consult.id}`}>
                                        Ver

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
                </Whitebox>
            </MainContainer>
        )

        <main>
            <h2>Listado de consultas</h2>

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
                {filteredConsults.length === 0 ? (
                    <p>No hay consultas para mostrar.</p>
                ) : (
                    filteredConsults.map((consult) => (
                        <li key={consult.id}>
                            <h3>Asunto: {consult.title}</h3>
                            <h3>Descripción: {consult.description}</h3>
                            <h3>Paciente: {consult.author}</h3>
                            <Link to={`/consult/${consult.id}`}>Ver</Link>
                        </li>
                    ))
                )}
            </ul>
            <aside>
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
    );
};

export default ConsultListPage;
