import { Link, NavLink } from 'react-router-dom';
import { useContext, useState, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ButtonAction } from '../components/ButtonAction';
import { H2 } from '../components/H2';
import { Label } from '../components/Label';
import MainContainer from '../components/Main';
import Whitebox from '../components/Whitebox';

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
                if (body.status === 'error') throw new Error(body.message);
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
                const res = await fetch(
                    `${VITE_API_URL}/api/doctor/${authUser.id}`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                const body = await res.json();
                if (body.status === 'error') throw new Error(body.message);
                setDoctorData(body.data.user);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchDoctorData();
    }, [authUser.id, authUser.role, authToken]);

    const toggleUnassignedFilter = () => setShowUnassigned((prev) => !prev);

    const filteredConsults = useMemo(() => {
        if (!doctorData && authUser.role !== 'patient') return consults;

        return consults.filter((consult) => {
            if (authUser.role === 'patient') {
                return consult.author === authUser.username;
            } else if (authUser.role === 'doctor') {
                if (showUnassigned) {
                    return (
                        consult.doctorId === null &&
                        consult.speciality === doctorData.specialty
                    );
                }
                return (
                    consult.doctorId === doctorData.id &&
                    consult.speciality === doctorData.specialty
                );
            }
            return true;
        });
    }, [consults, authUser, doctorData, showUnassigned]);

    // Renderiza un solo consult item
    const renderConsultItem = (consult) => (
        <li key={consult.id} className="mb-4">
            <Whitebox>
                <h3>
                    <Label text="Asunto:" /> {consult.title}
                </h3>
                <h3>
                    <Label text="Descripción:" /> {consult.description}
                </h3>
                <h3>
                    <Label text="Paciente:" /> {consult.author}
                </h3>
                <Link
                    to={`/consult/${consult.id}`}
                    className="mt-2 inline-block bg-black text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
                >
                    Ver consulta
                </Link>
            </Whitebox>
        </li>
    );

    return (
        <MainContainer>
            <Whitebox>
                <H2 text="Listado de consultas" />

                {/* Botón para doctores para filtrar consultas */}
                {authUser.role === 'doctor' && (
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
                        filteredConsults.map(renderConsultItem)
                    )}
                </ul>

                {/* Botones adicionales */}
                <aside>
                    {/* Mostrar botón de añadir consulta solo para pacientes */}
                    {authUser && authUser.role === 'patient' && (
                        <NavLink to={`/user/${authUser ? authUser.id : ''}`}>
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
    );
};

export default ConsultListPage;
