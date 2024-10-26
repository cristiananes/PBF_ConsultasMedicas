import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
const { VITE_API_URL } = import.meta.env;
import { useParams } from 'react-router-dom';
import { H2 } from '../components/H2';
import { Label } from '../components/Label';
import MainContainer from '../components/Main';
import Whitebox from '../components/Whitebox';

const ConsultListPage = () => {
    const { userId } = useParams();
    const { authToken, authUser } = useContext(AuthContext);
    const [consults, setConsults] = useState([]);
    const [doctorData, setDoctorData] = useState([]);
    const [showUnassigned, setShowUnassigned] = useState(false);

    // Fetch de las consultas.
    const fetchConsults = async () => {
        try {
            //obtenemos la respuesta del servidor
            const res = await fetch(`${VITE_API_URL}/api/consults`, {
                method: 'get',
                headers: {
                    Authorization: authToken,
                },
            });
            //obtenemos el body de la ruta anteriormente seleccionada
            const body = await res.json();
            console.log(body);

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            //Almacenamos las consultas
            console.log(body.data.consults);
            setConsults(body.data.consults);
            return body.data.consults;
        } catch (err) {
            return err.message;
        }
    };

    // Fetch de los datos de los doctores.
    const fetchDoctorData = async () => {
        try {
            // Obtenemos la respuesta del servidor para la ruta específica del doctor.
            const res = await fetch(`${VITE_API_URL}/api/doctor/${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: authToken,
                },
            });

            // Obtenemos el body de la respuesta.
            const body = await res.json();
            console.log(body);

            // Si hay algún error, lanzamos una excepción.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Almacenamos los datos del doctor.
            console.log(body.data.doctorData);
            setDoctorData(body.data.doctorData);
            return body.data.doctorData;
        } catch (err) {
            return err.message;
        }
    };
    console.log(setDoctorData);

    fetchConsults();
    fetchDoctorData();

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
    );
};

export default ConsultListPage;
