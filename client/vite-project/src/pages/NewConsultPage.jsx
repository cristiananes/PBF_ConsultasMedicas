import { ButtonAction } from '../components/ButtonAction';

// Importamos los hooks.
import { useContext, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos el hook para obtener la lista de especialidades médicas.
import { fetchSpecialties } from '../hooks/fetchSpecialty';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const NewConsultPage = () => {
    // Obtenemos los datos del usuario y el token.
    const { authUser, authToken } = useContext(AuthContext);

    // Declaramos una variable en el State para cada input.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('');

    const [specialtyName, setSpecialtyName] = useState('');
    const [file, setFile] = useState(null);

    // Variable para almacenar la lista de especialidades disponibles
    const [specialties, setSpecialties] = useState([]);

    // Variable que indica cuando termina el fetch de crear una nueva entrada.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleAddEntry = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Para enviar archivos debemos crear un objeto de tipo FormData.
            const formData = new FormData();

            // Ahora agregamos las propiedades y valores al objeto anterior.
            formData.append('title', title);
            formData.append('description', description);
            formData.append('urgency', urgency);
            formData.append('specialtyName', specialtyName);

            // Las propiedades de las fotos las crearemos solo si existe la foto.
            file && formData.append('file', file);

            // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
            setLoading(true);

            // Obtenemos la respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/consult/new-consult`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'newConsult',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'newConsult',
            });
        } finally {
            // Indicamos que ha finalizado el fetch para habilitar el botón.
            setLoading(false);
        }
    };

    // useEffect para cargar las especialidades al montar el componente
    useEffect(() => {
        const loadSpecialties = async () => {
            try {
                const fetchedSpecialties = await fetchSpecialties(authToken);
                setSpecialties(fetchedSpecialties); // Actualizamos el estado con las especialidades
            } catch (err) {
                console.error('Error loading specialties:', err);
            }
        };

        // Llamamos a la función para cargar las especialidades.
        loadSpecialties();
    }, [authToken]);

    // Si el usuario no tiene token, lo enviamos a la página de login
    if (!authUser) {
        return <Navigate to="/login" />;
    }

    return (
        <main>
            <h2>Página de nueva consulta</h2>
            <NavLink to="/consults">
                <ButtonAction text="Volver a consultas" />
            </NavLink>
            <form onSubmit={handleAddEntry}>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <label htmlFor="urgency">Urgencia:</label>
                <input
                    type="text"
                    id="urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    required
                />

                <label htmlFor="specialty">Especialidad:</label>

                <select
                    id="specialty"
                    value={specialtyName}
                    onChange={(e) => setSpecialtyName(e.target.value)}
                    required
                >
                    <option value="" disabled>
                        Selecciona una opción
                    </option>
                    {specialties.map((spec, index) => (
                        <option key={index} value={spec}>
                            {spec}
                        </option>
                    ))}
                </select>

                <label htmlFor="file">Archivo:</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/jpeg, image/png, image/jpg"
                />

                {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                <button disabled={loading}>Crear entrada</button>
            </form>
        </main>
    );
};

export default NewConsultPage;
