// Importamos los hooks.
import { useContext, useState, useEffect } from 'react';

// Importamos el contexto y la función de especialidades.
import { AuthContext } from '../contexts/AuthContext';
import { fetchSpecialties } from '../hooks/fetchSpecialty';

// Importamos la función toast y los componentes necesarios.
import toast from 'react-hot-toast';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';

const { VITE_API_URL } = import.meta.env;

const WorkerCreationPage = () => {
    const { authUser, authToken } = useContext(AuthContext);
    console.log(authUser);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');
    const [specialtyName, setSpecialtyName] = useState('');
    const [experience, setExperience] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [specialties, setSpecialties] = useState([]); // Estado para las especialidades

    // Carga de especialidades al montar el componente.
    useEffect(() => {
        const loadSpecialties = async () => {
            try {
                const fetchedSpecialties = await fetchSpecialties(authToken);
                setSpecialties(fetchedSpecialties);
            } catch (err) {
                console.error('Error al cargar especialidades:', err);
            }
        };
        loadSpecialties();
    }, [authToken]);

    // Manejo del envío del formulario.
    const handleRegisterAdmin = async (e) => {
        try {
            e.preventDefault();
            if (password !== repeatedPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            setLoading(true);
            const res = await fetch(`${VITE_API_URL}/api/user/admin-register`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    specialtyName,
                    experience,
                    licenseNumber,
                    role,
                }),
            });

            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);
            toast.success(body.message, { id: 'register' });
        } catch (err) {
            toast.error(err.message, { id: 'register' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainContainer>
            <div className="max-w-2xl mt-10 w-full bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
                <H2 text="Registro de nuevo usuario" />
                <form
                    onSubmit={handleRegisterAdmin}
                    className="grid grid-cols-1 gap-6"
                >
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Nombre:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Apellido:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Usuario:
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="pass"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña:
                        </label>
                        <input
                            type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="repeatedPass"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Repetir contraseña:
                        </label>
                        <input
                            type="password"
                            id="repeatedPass"
                            value={repeatedPass}
                            onChange={(e) => setRepeatedPass(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

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
                            onChange={(e) => setSpecialtyName(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
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
                            htmlFor="experience"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Experiencia:
                        </label>
                        <input
                            type="text"
                            id="experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="licenseNumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Número de licencia:
                        </label>
                        <input
                            type="text"
                            id="licenseNumber"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Rol
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        >
                            <option value="">Selecciona una opción</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            disabled={loading}
                            className="px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-black transition-colors duration-300 disabled:opacity-50"
                        >
                            {loading ? 'Registrando...' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </MainContainer>
    );
};

export default WorkerCreationPage;
