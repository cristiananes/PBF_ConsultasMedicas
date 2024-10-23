// Importamos los hooks.

import { useContext, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos el hook para obtener la lista de especialidades médicas.
import { useSpecialties } from '../hooks/useSpecialty';

//importamos tailwind components
import { H2 } from '../components/H2';
import { Label } from '../components/Label';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const NewConsultPage = () => {
    // Obtenemos los datos del usuario y el token.

    const { authToken } = useContext(AuthContext);

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

    useEffect(() => {
        const fetchSpecialties = async () => {
            console.log('Fetching specialties...');
            const data = await useSpecialties(authToken);
            console.log('Datos recibidos de especialidades:', data);
            if (Array.isArray(data)) {
                setSpecialties(data);
                console.log('Especialidades establecidas:', data);
            } else {
                console.error('Error fetching specialties:', data);
            }
        };

        fetchSpecialties();
    }, [authToken]);

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

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-eggblue to-ultraviolet p-10">
            <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 ">
                <H2 text="Página de nueva consulta" />

                <form className="space-y-6" onSubmit={handleAddEntry}>
                    {/*Fila 1: titulo y urgencia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="title" text="Título:" />
                            <input
                                type="text"
                                id="title"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-eggblue focus:border-eggblue sm:backdrop:text-sm "
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label text="Urgencia" htmlFor="urgency" />
                            <input
                                type="text"
                                id="urgency"
                                placeholder="Alta/Media/Baja"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-eggblue focus:border-eggblue sm:backdrop:text-sm "
                                value={urgency}
                                onChange={(e) => setUrgency(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/*Fila 2: Especialidad y archivo*/}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="specialty" text="Especialidad:" />

                            <select
                                id="specialty"
                                value={specialtyName}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-eggblue focus:border-eggblue sm:text-sm"
                                onChange={(e) =>
                                    setSpecialtyName(e.target.value)
                                }
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
                        </div>
                        <div>
                            <Label htmlFor="file" text="Archivo:" />
                            <input
                                type="file"
                                id="file"
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept="image/jpeg, image/png, image/jpg"
                            />
                        </div>
                    </div>
                    {/* fila 3: Descripcion */}
                    <div>
                        <Label htmlFor="description" text="Descripción:" />
                        <textarea
                            id="description"
                            value={description}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            rows="4"
                            placeholder="Escribe una descripción..."
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    {/* Botones volver y crear entrada */}

                    <div className="flex justify-between w-full">
                        <NavLink to="/consults">
                            <button
                                type="button"
                                className="px-8 py-3 bg-ultraviolet text-white font-semibold rounded-md hover:bg-black"
                            >
                                Volver
                            </button>
                        </NavLink>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-ultraviolet text-white font-semibold rounded-md hover:bg-black"
                            disabled={loading}
                        >
                            Crear consulta
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default NewConsultPage;
