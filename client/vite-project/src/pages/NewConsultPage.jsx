import { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { fetchSpecialties } from '../hooks/fetchSpecialty';
import { DoctorSelect } from '../components/DoctorSelect'; // Cambiado a DoctorSelect
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
import { H2 } from '../components/H2';
import Whitebox from '../components/Whitebox';

const { VITE_API_URL } = import.meta.env;

const NewConsultPage = () => {
    const { authUser, authToken } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [urgency, setUrgency] = useState(''); // Estado para urgencia
    const [specialtyName, setSpecialtyName] = useState('');
    const [file, setFile] = useState(null);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showDoctorSelect, setShowDoctorSelect] = useState(false); // Estado de visibilidad
    const navigate = useNavigate();
    const handleAddEntry = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('urgency', urgency); // Se envía el valor de urgencia
            formData.append('specialtyName', specialtyName);
            selectedDoctor && formData.append('doctorId', selectedDoctor.id);
            file && formData.append('file', file);

            setLoading(true);
            const res = await fetch(`${VITE_API_URL}/api/consult/new-consult`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);
            navigate('/consults');
            toast.success(body.message, { id: 'newConsult' });
        } catch (err) {
            toast.error(err.message, { id: 'newConsult' });
        } finally {
            setLoading(false);
        }
    };

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
        <MainContainer>
            <Whiteboxanim>
                <H2
                    className="text-2xl font-bold text-center mb-6"
                    text="Nueva consulta"
                />

                <form onSubmit={handleAddEntry} className="space-y-6">
                    {/* Fila 1: Título y Urgencia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Título:
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="urgency"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Urgencia:
                            </label>
                            <select
                                id="urgency"
                                value={urgency}
                                onChange={(e) => setUrgency(e.target.value)}
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="" disabled>
                                    Selecciona una urgencia
                                </option>
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                    </div>

                    {/* Fila 2: Especialidad y Archivo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="specialty"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Especialidad:
                            </label>
                            <select
                                id="specialty"
                                value={specialtyName}
                                onChange={(e) =>
                                    setSpecialtyName(e.target.value)
                                }
                                required
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            <label
                                htmlFor="file"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Archivo:
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept="image/jpeg, image/png, image/jpg"
                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>

                    {/* Fila 3: Doctor y Selección de Doctor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Doctor:
                        </label>
                        <button
                            type="button"
                            onClick={toggleDoctorSelect}
                            className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-black"
                        >
                            {showDoctorSelect
                                ? 'Ocultar lista de doctores'
                                : 'Mostrar lista de doctores'}
                        </button>
                        {showDoctorSelect && (
                            <div className="flex flex-col items-center justify-center ml-10 mt-4 space-y-4">
                                <Whitebox>
                                    <DoctorSelect
                                        onDoctorSelect={handleDoctorSelect}
                                    />
                                </Whitebox>
                            </div>
                        )}
                        {selectedDoctor && (
                            <p className="mt-2 text-sm text-gray-700">
                                Doctor seleccionado: {selectedDoctor.firstName}{' '}
                                {selectedDoctor.lastName}
                            </p>
                        )}
                    </div>

                    {/* Fila 4: Descripción */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Descripción:
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            rows="4"
                            placeholder="Escribe una descripción..."
                        ></textarea>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex justify-between mt-6">
                        <NavLink to="/consults">
                            <button
                                type="button"
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-black"
                            >
                                Volver
                            </button>
                        </NavLink>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-black"
                            disabled={loading}
                        >
                            Crear consulta
                        </button>
                    </div>
                </form>
            </Whiteboxanim>
        </MainContainer>
    );
};

export default NewConsultPage;
