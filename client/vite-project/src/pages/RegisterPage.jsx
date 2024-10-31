// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
import { H2 } from '../components/H2';
import { Label } from '../components/Label';
import MainContainer from '../components/Main';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RegisterPage = () => {
    // Importamos los datos del usuario.
    const { authUser } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para definir el valor de cada input.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    // Variable que indica cuando termina el fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneje el envío del formulario.
    const handleRegisterUser = async (e) => {
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
            const res = await fetch(`${VITE_API_URL}/api/user/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                }),
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Redirigimos a la página de login.
            navigate('/login');

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

    // Si estamos logeados restringimos el acceso redirigiendo a la página principal.
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <MainContainer>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full animate-slideIn bg-opacity-80">
                <H2 text="Registro de usuario" />

                <form
                    onSubmit={handleRegisterUser}
                    className="grid grid-cols-2 gap-5"
                >
                    <div className="flex flex-col">
                        <Label htmlFor="firstName" text="Nombre:" />
                        <input
                            type="text"
                            id="firstName"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="lastName" text="Apellido:" />
                        <input
                            type="text"
                            id="lastName"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2  focus:ring-blue-400"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <Label htmlFor="username" text="Nombre de usuario:" />

                        <input
                            type="text"
                            id="username"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2  focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-span-2 flex flex-col">
                        <Label htmlFor="email" text="Email:" />
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2  focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <Label htmlFor="pass" text="Contraseña:" />

                        <input
                            type="password"
                            id="pass"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2  focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <Label
                            htmlFor="repeatedPass"
                            text="Repetir contraseña:"
                        />
                        <input
                            type="password"
                            id="repeatedPass"
                            className="border border-gray-300 rounded-md px-4 py-1 mt-1 focus:outline-none focus:ring-2  focus:ring-blue-400"
                            value={repeatedPass}
                            onChange={(e) => setRepeatedPass(e.target.value)}
                            required
                        />
                    </div>

                    {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                    <ButtonAction disabled={loading} text="Registrarme" />
                </form>
            </div>
        </MainContainer>
    );
};

export default RegisterPage;
