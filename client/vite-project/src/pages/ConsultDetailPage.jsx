import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
import RespuestaConsultas from '../components/ReplyConsult';

import { H2 } from '../components/H2';
import { Label } from '../components/Label';
import MainContainer from '../components/Main';
import Whitebox from '../components/Whitebox';

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
    const [selectedRating, setSelectedRating] = useState(null);

    useEffect(() => {
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

    const handleRating = async (replyId) => {
        if (selectedRating) {
            try {
                const response = await fetch(
                    `${VITE_API_URL}/api/reply/${replyId}/rating`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: authToken,
                        },
                        body: JSON.stringify({
                            replyId,
                            rating: selectedRating,
                            userId: authUser.id,
                        }),
                    }
                );
                if (!response.ok) {
                    throw new Error('Error al enviar la calificación');
                }
                const result = await response.json();
                alert('Calificación enviada correctamente: ' + result.message);
            } catch (err) {
                alert('Error al enviar la calificación: ' + err.message);
            }
        } else {
            alert('Por favor selecciona una calificación.');
        }
    };

    if (loadingConsult) {
        return <div>Cargando detalles de la consulta...</div>;
    }

    if (errorConsult) {
        return <div>Error al cargar la consulta: {errorConsult}</div>;
    }

    return (
        // <MainContainer>
        //     {consult ? (
        //         <>
        //             <Whitebox>
        //                 <H2 text="Detalles de la Consulta" />
        //                 <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
        //                     <h3>
        //                         <Label text="Nombre de usuario:" />{' '}
        //                         {consult.author}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Título:" /> {consult.title}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Descripción:" />{' '}
        //                         {consult.description}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Nombre del paciente:" />{' '}
        //                         {consult.patientFirstName}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Apellido:" />{' '}
        //                         {consult.patientLastName}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Especialidad:" />{' '}
        //                         {consult.specialityName}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Urgencia:" /> {consult.urgency}
        //                     </h3>
        //                     <h3>
        //                         <Label text="Consulta creada el día:" />{' '}
        //                         {moment(consult.createdAt).format(
        //                             'DD/MM/YYYY HH:mm'
        //                         )}
        //                     </h3>
        //                     <div className="flex flex-col items-center">
        //                         {consult.file ? (
        //                             <img
        //                                 className="w-80 h-80 object-cover mb-4"
        //                                 src={`${VITE_API_URL}/${consult.file}`}
        //                                 alt={`Archivo adjuntado a la consulta por el usuario`}
        //                             />
        //                         ) : (
        //                             <h3>
        //                                 Esta consulta no contiene archivos
        //                                 adicionales
        //                             </h3>
        //                         )}
        //                     </div>
        //                 </div>
        //             </Whitebox>
        //         </>
        //     ) : (
        //         <p>No se encontró la consulta.</p>
        //     )}

        //     <Whitebox>
        //         <H2 text="Respuestas:" />
        //         <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
        //             {loadingReplies ? (
        //                 <p>Cargando respuestas...</p>
        //             ) : errorReplies ? (
        //                 <p>{errorReplies}</p>
        //             ) : Array.isArray(replies) && replies.length > 0 ? (
        //                 <ul>
        //                     {replies.map((reply) => (
        //                         <li key={reply.id}>
        //                             <h3 className="text-lg font-medium text-gray-700">
        //                                 Respuesta de: {reply.author}
        //                             </h3>
        //                             <p>{reply.answerText}</p>
        //                             {reply.userId !== authUser.id && (
        //                                 <div>
        //                                     <span className="text-red-500  cursor-pointer font-bold mt-4">
        //                                         Valora esta respuesta
        //                                     </span>
        //                                     {/* <button className="text-black bg-white cursor-pointer mt-10 ml-2 px-3 py-1 rounded">
        //                                         Valora esta respuesta
        //                                     </button> */}
        //                                     <select
        //                                         onChange={(e) =>
        //                                             setSelectedRating(
        //                                                 Number(e.target.value)
        //                                             )
        //                                         }
        //                                         value={selectedRating}
        //                                         className="ml-2"
        //                                     >
        //                                         <option value="">
        //                                             Selecciona una calificación
        //                                         </option>
        //                                         {[1, 2, 3, 4, 5].map((num) => (
        //                                             <option
        //                                                 key={num}
        //                                                 value={num}
        //                                             >
        //                                                 {num}
        //                                             </option>
        //                                         ))}
        //                                     </select>
        //                                     <button
        //                                         onClick={() =>
        //                                             handleRating(reply.id)
        //                                         }
        //                                         className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
        //                                     >
        //                                         Enviar
        //                                     </button>
        //                                 </div>
        //                             )}
        //                             {reply.file && (
        //                                 <p>
        //                                     <Label text="Respondido el:" />{' '}
        //                                     {moment(reply.createdAt).format(
        //                                         'DD/MM/YYYY HH:mm'
        //                                     )}
        //                                 </p>
        //                             )}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             ) : (
        //                 <p>No hay respuestas para esta consulta aún.</p>
        //             )}
        //         </div>
        //     </Whitebox>

        //     {consult && (
        //         <Whitebox>
        //             <H2 text="Responder a la Consulta" />
        //             <RespuestaConsultas consultId={consultId} />
        //         </Whitebox>
        //     )}

        //     <Whitebox>
        //         <NavLink to="/consults">
        //             <ButtonAction text="Volver a lista de consultas" />
        //         </NavLink>
        //     </Whitebox>
        // </MainContainer>
        <MainContainer>
            <NavLink to="/consults">
                <button className="bg-blue-500 mt-10 ml-0  text-white px-8 py-1 rounded-md shadow hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition">
                    Volver{' '}
                </button>
            </NavLink>
            {consult ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
                    {/* Detalles de la consulta */}
                    <Whitebox className="col-span-1">
                        <H2 text="Detalles de la Consulta" />
                        <div className="p-6 bg-white shadow-lg rounded-lg bg-opacity-80">
                            <h3>
                                <Label text="Nombre de usuario:" />{' '}
                                {consult.author}
                            </h3>
                            <h3>
                                <Label text="Título:" /> {consult.title}
                            </h3>
                            <h3>
                                <Label text="Descripción:" />{' '}
                                {consult.description}
                            </h3>
                            <h3>
                                <Label text="Nombre del paciente:" />{' '}
                                {consult.patientFirstName}
                            </h3>
                            <h3>
                                <Label text="Apellido:" />{' '}
                                {consult.patientLastName}
                            </h3>
                            <h3>
                                <Label text="Especialidad:" />{' '}
                                {consult.specialityName}
                            </h3>
                            <h3>
                                <Label text="Urgencia:" /> {consult.urgency}
                            </h3>
                            <h3>
                                <Label text="Consulta creada el día:" />{' '}
                                {moment(consult.createdAt).format(
                                    'DD/MM/YYYY HH:mm'
                                )}
                            </h3>
                            <div className="flex flex-col items-center mt-4">
                                {consult.file ? (
                                    <img
                                        className="w-80 h-80 object-cover mb-4"
                                        src={`${VITE_API_URL}/${consult.file}`}
                                        alt="Archivo adjuntado a la consulta por el usuario"
                                    />
                                ) : (
                                    <h3>
                                        Esta consulta no contiene archivos
                                        adicionales
                                    </h3>
                                )}
                            </div>
                        </div>
                    </Whitebox>

                    {/* Respuestas */}
                    <Whitebox className="col-span-1">
                        <H2 text="Respuestas:" />
                        <div className="p-6 bg-white shadow-lg rounded-lg bg-opacity-80">
                            {loadingReplies ? (
                                <p>Cargando respuestas...</p>
                            ) : errorReplies ? (
                                <p>{errorReplies}</p>
                            ) : Array.isArray(replies) && replies.length > 0 ? (
                                <ul>
                                    {replies.map((reply) => (
                                        <li key={reply.id} className="mb-4">
                                            <h3 className="text-lg font-medium text-gray-700">
                                                Respuesta de: {reply.author}
                                            </h3>
                                            <p>{reply.answerText}</p>
                                            {reply.userId !== authUser.id && (
                                                <div className="mt-2">
                                                    <span className="text-red-500 cursor-pointer font-bold">
                                                        Valora esta respuesta
                                                    </span>
                                                    <select
                                                        onChange={(e) =>
                                                            setSelectedRating(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        value={selectedRating}
                                                        className="ml-2 border rounded"
                                                    >
                                                        <option value="">
                                                            Selecciona una
                                                            calificación
                                                        </option>
                                                        {[1, 2, 3, 4, 5].map(
                                                            (num) => (
                                                                <option
                                                                    key={num}
                                                                    value={num}
                                                                >
                                                                    {num}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                    <button
                                                        onClick={() =>
                                                            handleRating(
                                                                reply.id
                                                            )
                                                        }
                                                        className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                                                    >
                                                        Enviar
                                                    </button>
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-500 mt-2">
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
                    </Whitebox>
                </div>
            ) : (
                <p>No se encontró la consulta.</p>
            )}

            {/* Responder a la consulta */}
            {consult && (
                <Whitebox>
                    <H2 text="Responder a la Consulta" />
                    <RespuestaConsultas consultId={consultId} />
                </Whitebox>
            )}

            {/* Botón de volver a la lista de consultas */}
            <Whitebox className="mt-4 p-6">
                <NavLink to="/consults">
                    <ButtonAction text="Volver a lista de consultas" />
                </NavLink>
            </Whitebox>
        </MainContainer>
    );
};

export default ConsultDetail;
