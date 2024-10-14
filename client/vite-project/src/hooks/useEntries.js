// Importamos los hooks.
import { useEffect, useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useEntries = () => {
    // Declaramos una variable en el State que permita almacenar el array de entradas.
    const [entries, setEntries] = useState([]);

    // Declaramos tres variables que asignaremos a los inputs de filtrado.
    const [author, setAuthor] = useState('');
    const [urgency, setUrgency] = useState('');
    const [speciality, setSpeciality] = useState('');
    // Obtenemos las entradas cuando se monta el componente.
    useEffect(() => {
        // Solicitamos las entradas al servidor.
        const fetchEntries = async () => {
            try {
                // Obtenmemos una respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/entries?author=${author}&urgency=${urgency}&speciality=${speciality}`
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Almacenamos las entradas.
                setEntries(body.data.entries);
            } catch (err) {
                toast.error(err.message, {
                    id: 'listEntries',
                });
            }
        };

        // Llamamos a la función anterior.
        fetchEntries();
    }, [author, urgency, speciality]);

    // Retornamos las entradas.
    return { entries, author, urgency, speciality, setAuthor, setUrgency, setSpeciality };
};

export default useEntries;
