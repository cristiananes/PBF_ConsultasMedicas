// Importamos los hooks.
import { useEffect, useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useEntry = (entryId) => {
    // Declaramos una variable en el State que permita almacenar la info de la entrada.
    const [entry, setEntry] = useState(null);

    // Obtenemos la entrada cuando se monta el componente.
    useEffect(() => {
        // Solicitamos la entrada al servidor.
        const fetchEntry = async () => {
            try {
                // Obtenmemos una respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/entries/${entryId}`
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Almacenamos la entrada.
                setEntry(body.data.entry);
            } catch (err) {
                toast.error(err.message, {
                    id: 'entryDetails',
                });
            }
        };

        // Llamamos a la función anterior.
        fetchEntry();
    }, [entryId]);

    // Actualizamos la media de votos de la entrada en el State.
    const updateEntryVotes = (votesAvg) => {
        setEntry({
            ...entry,
            votes: votesAvg,
        });
    };

    // Actualizamos las fotos de la entrada en el State.
    const updateEntryPhotos = (newPhoto) => {
        setEntry({
            ...entry,
            photos: [...entry.photos, newPhoto],
        });
    };

    // Eliminamos una fotos de la entrada en el State.
    const deleteEntryPhotos = (photoId) => {
        setEntry({
            ...entry,
            photos: entry.photos.filter((photo) => photo.id !== photoId),
        });
    };

    // Retornamos los variables y funciones necesarias.
    return {
        entry,
        updateEntryVotes,
        updateEntryPhotos,
        deleteEntryPhotos,
    };
};

export default useEntry;

