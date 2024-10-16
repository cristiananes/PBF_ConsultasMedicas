import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import { AuthContext } from '../contexts/AuthContext';

const ConsultDetail = () => {
    const { consultId } = useParams(); // Obtén el ID desde los parámetros de la URL
    const [consult, setConsult] = useState(null);
    const { authToken } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                console.log(`response: ${response}`);
                if (!response.ok) {
                    throw new Error('Consulta no encontrada');
                }
                const body = await response.json();
                setConsult(body.data.consult);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsult();
    }, [consultId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!consult) {
        return <div>No se encontró la consulta</div>;
    }

    return (
        <div>
            <h2>Detalles de la Consulta</h2>
            <p>
                <strong>Nombre:</strong> {consult.author}
            </p>
            <p>
                <strong>titulo:</strong> {consult.title}
            </p>
            <p>
                <strong>descripcion:</strong> {consult.description}
            </p>
        </div>
    );
};

export default ConsultDetail;
