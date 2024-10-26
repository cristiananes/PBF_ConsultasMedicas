<<<<<<< HEAD
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
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';

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
=======
import { ButtonAction } from '../components/ButtonAction';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
//import { fetchSpecialties } from '../hooks/fetchSpecialty';
import { DoctorSelect } from '../components/DoctorSelect'; // Cambiado a DoctorSelect

const { VITE_API_URL } = import.meta.env;

const NewConsultPage = () => {
    const { authUser, authToken } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState('');
    const [specialtyName, setSpecialtyName] = useState('');
    const [file, setFile] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDoctorSelect, setShowDoctorSelect] = useState(false); // Estado de visibilidad

    const handleAddEntry = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
>>>>>>> c283241 (new consult page eliminar para mi)
            formData.append('title', title);
            formData.append('description', description);
            formData.append('urgency', urgency);
            formData.append('specialtyName', specialtyName);
<<<<<<< HEAD

            // Las propiedades de las fotos las crearemos solo si existe la foto.
            file && formData.append('file', file);

            // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
            setLoading(true);

            // Obtenemos la respuesta del servidor.
=======
            selectedDoctor && formData.append('doctorId', selectedDoctor.id);
            file && formData.append('file', file);

            setLoading(true);
>>>>>>> c283241 (new consult page eliminar para mi)
            const res = await fetch(`${VITE_API_URL}/api/consult/new-consult`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

<<<<<<< HEAD
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
=======
            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);

            toast.success(body.message, { id: 'newConsult' });
        } catch (err) {
            toast.error(err.message, { id: 'newConsult' });
        } finally {
>>>>>>> c283241 (new consult page eliminar para mi)
            setLoading(false);
        }
    };

<<<<<<< HEAD
    return (
        <MainContainer>
            <Whiteboxanim>
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
                                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-black"
                            >
                                Volver
                            </button>
                        </NavLink>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-green-500 hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-white font-semibold rounded-md"
                            disabled={loading}
                        >
                            Crear consulta
                        </button>
                    </div>
                </form>
            </Whiteboxanim>
        </MainContainer>
=======
    useEffect(() => {
        const loadSpecialties = async () => {
            try {
                const fetchedSpecialties = await fetchSpecialties(authToken);
                setSpecialties(fetchedSpecialties);
            } catch (err) {
                console.error('Error loading specialties:', err);
            }
        };
        loadSpecialties();
    }, [authToken]);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setShowDoctorSelect(false); // Oculta la lista tras seleccionar un doctor
    };

    const toggleDoctorSelect = () => {
        setShowDoctorSelect((prev) => !prev);
    };

    if (!authUser) return <Navigate to="/login" />;

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
                />

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

                <label>Doctor:</label>
                <button type="button" onClick={toggleDoctorSelect}>
                    {showDoctorSelect
                        ? 'Ocultar lista de doctores'
                        : 'Mostrar lista de doctores'}
                </button>

                {showDoctorSelect && (
                    <DoctorSelect onDoctorSelect={handleDoctorSelect} />
                )}

                {selectedDoctor && (
                    <p>
                        Doctor seleccionado: {selectedDoctor.firstName}{' '}
                        {selectedDoctor.lastName}
                    </p>
                )}

                <label htmlFor="file">Archivo:</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/jpeg, image/png, image/jpg"
                />

                <button disabled={loading}>Crear consulta</button>
            </form>
        </main>
>>>>>>> c283241 (new consult page eliminar para mi)
    );
};

export default NewConsultPage;
