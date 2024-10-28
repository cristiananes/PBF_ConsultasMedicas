import { Link } from 'react-router-dom';
import { useContext, useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
const { VITE_API_URL } = import.meta.env;

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

    // Log de datos de doctor y consultas
    // useEffect(() => {
    //     if (doctorData && consults.length > 0) {
    //         console.log(
    //             'DD spec:',
    //             doctorData.specialty,
    //             'Consultas:',
    //             consults.map((c) => c.speciality)
    //         );
    //         console.log('role:', authUser.role);
    //     }
    // }, [authUser, doctorData, consults]);

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
