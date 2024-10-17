import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
import RespuestaConsultas from '../components/ReplyConsult';

const { VITE_API_URL } = import.meta.env;

const ConsultDetail = () => {
    const { consultId } = useParams();
    const [consult, setConsult] = useState(null);
    const { authToken } = useContext(AuthContext);
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

    return (
        <main>
            {/* Sección de detalles de la consulta */}
            {consult ? (
                <div>
                    <h2>Detalles de la Consulta</h2>
                    <h3>Nombre de usuario: {consult.author}</h3>
                    <h3>Título: {consult.title}</h3>
                    <h3>Descripción: {consult.description}</h3>
                    <h3>Nombre del paciente: {consult.patientFirstName}</h3>
                    <h3>Apellido: {consult.patientLastName}</h3>
                    <h3>Especialidad: {consult.specialityName}</h3>
                    <h3>Urgencia: {consult.urgency}</h3>
                    <h3>
                        Consulta creada el día:{' '}
                        {moment(consult.createdAt).format('DD/MM/YYYY HH:mm')}
                    </h3>
                </div>
            ) : (
                <p>No se encontró la consulta.</p>
            )}

            {/* Sección para mostrar las respuestas */}
            <div>
                <h2>Respuestas:</h2>
                {loadingReplies ? (
                    <p>Cargando respuestas...</p>
                ) : errorReplies ? (
                    <p>{errorReplies}</p>
                ) : Array.isArray(replies) && replies.length > 0 ? (
                    <ul>
                        {replies.map((reply) => (
                            <li key={reply.id}>
                                <h3>Respuesta de: {reply.author}</h3>
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
                                    Respondido el:{' '}
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
                <div>
                    <h2>Responder a la Consulta</h2>
                    <RespuestaConsultas consultId={consultId} />
                </div>
            )}

            <div>
                <NavLink to="/consults">
                    <ButtonAction text="Volver a lista de consultas" />
                </NavLink>
            </div>
        </main>
    );
};

export default ConsultDetail;
