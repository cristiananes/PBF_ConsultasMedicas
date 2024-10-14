// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos los hooks.
import { useContext, useState } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const AddVoteForm = ({ entryId, updateEntryVotes, loading, setLoading }) => {
    // Obtenemos el token.
    const { authToken } = useContext(AuthContext);

    // Declaramos una variable en el estado para almacenar el valor del input.
    const [value, setValue] = useState(5);

    // Función que permite votar una entrada.
    const handleVoteEntry = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos una respuesta del servidor.
            const res = await fetch(
                `${VITE_API_URL}/api/entries/${entryId}/votes`,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authToken,
                    },
                    body: JSON.stringify({
                        // Convertimos el valor de tipo String a Number.
                        value: Number(value),
                    }),
                }
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Actualizamos la media de votos en el State.
            updateEntryVotes(body.data.votesAvg);

            // Indicamos al usuario que todo ha ido bien.
            toast.success(body.message, {
                id: 'entryDetails',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'entryDetails',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleVoteEntry}>
            <label htmlFor='vote'>Votar:</label>
            <input
                type='number'
                id='vote'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min='1'
                max='5'
                required
            />
            {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
            <button disabled={loading}>Votar</button>
        </form>
    );
};

// Validamos las props.
AddVoteForm.propTypes = {
    entryId: PropTypes.string.isRequired,
    updateEntryVotes: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default AddVoteForm;
