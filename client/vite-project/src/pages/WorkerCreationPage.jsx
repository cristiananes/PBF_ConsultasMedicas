// Importamos los hooks.
import { useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
// Importamos la función toast.
import toast from 'react-hot-toast';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const WorkerCreationPage = () => {
    // Importamos los datos del usuario.
    const { authUser, authToken } = useContext(AuthContext);
    console.log(authUser);

    // Importamos la función navigate.
    // const navigate = useNavigate();

    // Declaramos una variable en el State para definir el valor de cada input.
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

    // Variable que indica cuando termina el fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneje el envío del formulario.
    const handleRegisterAdmin = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Si las contraseñas no coinciden lanzamos un error.
            if (password !== repeatedPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos una respuesta.
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
                    authToken,
                }),
            });

            // Obtenemos el body.
            const body = await res.json();
            console.log(body);

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Si todo va bien mostramos un mensaje indicándolo.
            toast.success(body.message, {
                id: 'register',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'register',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };
<<<<<<< HEAD

    // Si no está autenticado o no es admin, no mostramos la página.
    if (!authUser || authUser.role !== 'admin') {
        return <Navigate to="/" />;
    }
    return (
        <main>
            <h2>Página de registro</h2>

            <form onSubmit={handleRegisterAdmin}>
                <label htmlFor="firstName">Nombre:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="lastName">Apellido:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="pass">Contraseña:</label>
                <input
                    type="password"
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="repeatedPass">Repetir contraseña:</label>
                <input
                    type="password"
                    id="repeatedPass"
                    value={repeatedPass}
                    onChange={(e) => setRepeatedPass(e.target.value)}
                    required
                />
                <label htmlFor="specialtyName">Especialidad:</label>
                <input
                    type="text"
                    id="specialty"
                    value={specialtyName}
                    onChange={(e) => setSpecialtyName(e.target.value)}
                    required
                />
                <label htmlFor="experience">Experiencia:</label>
                <input
                    type="text"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                />
                <label htmlFor="licenseNumber">Número de licencia: </label>
                <input
                    type="text"
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                />

                <label htmlFor="role">Rol</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <option value="">Selecciona una opción</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                </select>
                {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                <button disabled={loading}>Registrarme</button>
            </form>
        </main>
=======

    // Si no está autenticado o no es admin, no mostramos la página.
    // if (!authUser) {
    //   return <Navigate to='/' />;
    // }
    return (
        <MainContainer>
            <div className="max-w-2xl w-full bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
                <H2
                    text="
                    Página de registro"
                />

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
                            htmlFor="specialtyName"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Especialidad:
                        </label>
                        <input
                            type="text"
                            id="specialty"
                            value={specialtyName}
                            onChange={(e) => setSpecialtyName(e.target.value)}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-eggblue focus:border-eggblue"
                        />
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
<<<<<<< HEAD
        </main>

        // <main>
        //   <h2>Página de registro</h2>

        //   <form onSubmit={handleRegisterAdmin}>
        //     <label htmlFor='firstName'>Nombre:</label>
        //     <input
        //       type='text'
        //       id='firstName'
        //       value={firstName}
        //       onChange={(e) => setFirstName(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='lastName'>Apellido:</label>
        //     <input
        //       type='text'
        //       id='lastName'
        //       value={lastName}
        //       onChange={(e) => setLastName(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='username'>Usuario:</label>
        //     <input
        //       type='text'
        //       id='username'
        //       value={username}
        //       onChange={(e) => setUsername(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='email'>Email:</label>
        //     <input
        //       type='email'
        //       id='email'
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='pass'>Contraseña:</label>
        //     <input
        //       type='password'
        //       id='pass'
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='repeatedPass'>Repetir contraseña:</label>
        //     <input
        //       type='password'
        //       id='repeatedPass'
        //       value={repeatedPass}
        //       onChange={(e) => setRepeatedPass(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='specialtyName'>Especialidad:</label>
        //     <input
        //       type='text'
        //       id='specialty'
        //       value={specialtyName}
        //       onChange={(e) => setSpecialtyName(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='experience'>Experiencia:</label>
        //     <input
        //       type='text'
        //       id='experience'
        //       value={experience}
        //       onChange={(e) => setExperience(e.target.value)}
        //       required
        //     />
        //     <label htmlFor='licenseNumber'>Número de licencia: </label>
        //     <input
        //       type='text'
        //       id='licenseNumber'
        //       value={licenseNumber}
        //       onChange={(e) => setLicenseNumber(e.target.value)}
        //       required
        //     />

        //     <label htmlFor='role'>Rol</label>
        //     <select
        //       id='role'
        //       value={role}
        //       onChange={(e) => setRole(e.target.value)}
        //       required
        //     >
        //       <option value=''>Selecciona una opción</option>
        //       <option value='patient'>Patient</option>
        //       <option value='doctor'>Doctor</option>
        //       <option value='admin'>Admin</option>
        //     </select>
        //     {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        //     <button disabled={loading}>Registrarme</button>
        //   </form>
        // </main>
>>>>>>> 118d8b4 (cambio de diseño en todas las páginas, fallos en la de registro de usuario médico)
=======
        </MainContainer>
>>>>>>> a2ad1dd (nuevos componentes creados)
    );
};

export default WorkerCreationPage;
