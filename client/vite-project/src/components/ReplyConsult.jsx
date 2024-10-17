import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RespuestaConsultas = ({ consultId }) => {
    const [answerText, setAnswerText] = useState('');
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_URL
                }/api/consult/${consultId}/reply`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({ answerText }),
                }
            );

            if (!response.ok) {
                throw new Error('Error al añadir la respuesta');
            }

            const data = await response.json();
            toast.success(data.message); // Mensaje de éxito
            setAnswerText(''); // Limpiar el campo de entrada

            // Puedes redirigir a otra página si es necesario
            // navigate(`/consult/${consultId}`); // Descomentar para redirigir
        } catch (error) {
            toast.error(error.message); // Mensaje de error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                required
            />
            <button type="submit">Enviar Respuesta</button>
        </form>
    );
};

export default RespuestaConsultas;