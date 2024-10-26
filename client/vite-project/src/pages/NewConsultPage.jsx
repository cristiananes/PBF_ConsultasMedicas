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
            formData.append('title', title);
            formData.append('description', description);
            formData.append('urgency', urgency);
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
    );
};

export default NewConsultPage;
