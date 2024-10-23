import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
import RespuestaConsultas from '../components/ReplyConsult';
import { Navigate } from 'react-router-dom';
import { H2 } from '../components/H2';
import { Label } from '../components/Label';
const { VITE_API_URL } = import.meta.env;

const ConsultDetail = () => {
    const { consultId } = useParams();
    const [consult, setConsult] = useState(null);
    const { authToken, authUser } = useContext(AuthContext);
    const [replies, setReplies] = useState([]);
    const [loadingConsult, setLoadingConsult] = useState(true);
    const [loadingReplies, setLoadingReplies] = useState(true);
    const [errorConsult, setErrorConsult] = useState(null);
    const [errorReplies, setErrorReplies] = useState(null);

    useEffect(() => {
        // Llama a la API local para obtener los detalles de la consulta
        const fetchConsult = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/consult/${consultId}`,
                    {
                        method: 'get',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Consulta no encontrada');
                }
                const body = await response.json();
                setConsult(body.data.consult);
            } catch (err) {
                setErrorConsult(err.message);
            } finally {
                setLoadingConsult(false);
            }
        };

        // Llama a la API para obtener las respuestas asociadas a la consulta
        const fetchReplies = async () => {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/replies/${consultId}`,
                    {
                        method: 'get',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error('Respuestas no encontradas');
                }
                const body = await response.json();
                setReplies(body.data.answers || []);
            } catch (err) {
                setErrorReplies(err.message);
            } finally {
                setLoadingReplies(false);
            }
        };

        fetchConsult();
        fetchReplies();
    }, [consultId, authToken]);

    if (loadingConsult) {
        return <div>Cargando detalles de la consulta...</div>;
    }

    if (errorConsult) {
        return <div>Error al cargar la consulta: {errorConsult}</div>;
    }

    console.log(consult);
    console.log(authUser);

    // if (consult.author !== authUser.username) {
    //     return <Navigate to="/login" />;
    // }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-eggblue to-ultraviolet p-10">
            {/* Sección de detalles de la consulta */}
            {consult ? (
<<<<<<< HEAD
                <div>
                    <h2>Detalles de la Consulta</h2>
                    <h3>Nombre de usuario: {consult.author}</h3>
                    <h3>Título: {consult.title}</h3>
                    <h3>Descripción: {consult.description}</h3>
                    <h3>Nombre del paciente: {consult.patientFirstName}</h3>
                    <h3>Apellido: {consult.patientLastName}</h3>
                    <h3>Especialidad: {consult.specialityName}</h3>
                    <h3>Urgencia: {consult.urgency}</h3>
                    <div className="flex flex-col items-center">
                        {
                            // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos
                            // un avatar por defecto.
                            consult.file ? (
                                <img
                                    className="w-32 h-32 object-cover mb-4"
                                    src={`${VITE_API_URL}/${consult.file}`}
                                    alt={`Archivo adjuntado a la consulta por el usuario`}
                                />
                            ) : (
                                <h3>
                                    Esta consulta no contiene archivos
                                    adicionales
                                </h3>
                            )
                        }
                    </div>
=======
                <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
                    <H2 text="Detalles de la Consulta" />
>>>>>>> 98bcc84 (mejoras perfil de usuario, listado de consultas, añadir consulta, detalles de consulta. Tailwind)
                    <h3>
                        <Label text="Nombre de usuario:" /> {consult.author}
                    </h3>
                    <h3>
                        <Label text="Título:" /> {consult.title}
                    </h3>
                    <h3>
                        <Label text="Descripción:" /> {consult.description}
                    </h3>
                    <h3>
                        <Label text="Nombre del paciente:" />{' '}
                        {consult.patientFirstName}
                    </h3>
                    <h3>
                        <Label text="Apellido:" /> {consult.patientLastName}
                    </h3>
                    <h3>
                        <Label text="Especialidad:" /> {consult.specialityName}
                    </h3>
                    <h3>
                        <Label text="Urgencia:" /> {consult.urgency}
                    </h3>
                    <h3>
                        <Label text="Consulta creada el día:" />{' '}
                        {moment(consult.createdAt).format('DD/MM/YYYY HH:mm')}
                    </h3>
                </div>
            ) : (
                <p>No se encontró la consulta.</p>
            )}

            {/* Sección para mostrar las respuestas */}
            <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
                <H2 text="Respuestas:" />
                {loadingReplies ? (
                    <p>Cargando respuestas...</p>
                ) : errorReplies ? (
                    <p>{errorReplies}</p>
                ) : Array.isArray(replies) && replies.length > 0 ? (
                    <ul>
                        {replies.map((reply) => (
                            <li key={reply.id}>
                                <h3>
                                    <Label text="Respuesta de:" />{' '}
                                    {reply.author}
                                </h3>
                                <p>{reply.answerText}</p>
                                {reply.rating && (
                                    <p>Valoración: {reply.rating}</p>
                                )}
                                {reply.file && (
                                    <p>
                                        Archivo adjunto:{' '}
                                        <a
                                            href={`${VITE_API_URL}/uploads/${reply.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ver archivo
                                        </a>
                                    </p>
                                )}
                                <p>
                                    <Label text="Respondido el:" />{' '}
                                    {moment(reply.createdAt).format(
                                        'DD/MM/YYYY HH:mm'
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay respuestas para esta consulta aún.</p>
                )}
            </div>

            {/* Sección para responder a la consulta */}
            {consult && (
                <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
                    <H2 text="Responder a la Consulta" />

                    <RespuestaConsultas consultId={consultId} />
                </div>
            )}

            <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
                <NavLink to="/consults">
                    <ButtonAction text="Volver a lista de consultas" />
                </NavLink>
            </div>
        </main>
    );
};

export default ConsultDetail;
