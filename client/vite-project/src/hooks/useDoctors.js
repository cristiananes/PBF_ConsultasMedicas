// Importamos los hooks.
import { useContext, useEffect, useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;


// Inicializamos el hook.
const useDoctors = () => {
    const { authToken } = useContext(AuthContext);
    // Declaramos una variable en el State que permita almacenar el array de entradas.
    const [doctors, setDoctors] = useState([]);

    // Declaramos dos variables que asignaremos a los inputs de filtrado.
    const [specialty] = useState({});


    // Obtenemos los doctores cuando se monta el componente.
    useEffect(() => {
        // Solicitamos las entradas al servidor.
        const fetchDoctors = async () => {
            try {
                // Obtenmemos una respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/users/doctors`, {
                    method: 'get',
                    headers: {
                        Authorization: authToken
                    }
                }
                );

                // Obtenemos el body de la ruta anteriormete seleccionada (entiendo).
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Almacenamos los doctores.
                setDoctors(body.data.doctors);
            } catch (err) {
                toast.error(err.message, {
                    id: 'listDoctors',
                });
            }
        };

        // Llamamos a la función anterior.
        fetchDoctors();
    }, [doctors, specialty]);

    // Retornamos los Doctores y la especialidad para filtrarlos.
    return { doctors, specialty };
};

export default useDoctors;
