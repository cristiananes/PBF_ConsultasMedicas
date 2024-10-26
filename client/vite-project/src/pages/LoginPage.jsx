// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

//importamos componentes
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const LoginPage = () => {
    // Importamos los datos del usuario y la función que almacena el token.
    const { authUser, authLoginState } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para definir el valor de cada input.
    const [username, setUsername] = useState(''); // Cambiado de email a username
    const [password, setPassword] = useState('');

    // Variable que indica cuando termina el fetch.
    const [loading, setLoading] = useState(false);

    // Función que maneje el envío del formulario.
    const handleLoginUser = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos una respuesta.
            const res = await fetch(`${VITE_API_URL}/api/user/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username, // Cambiado de email a username
                    password,
                }),
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Almacenamos el token en el State y en el localStorage.
            authLoginState(body.data.token);

            // Redirigimos a la página principal.
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'login',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    // Si estamos logeados restringimos el acceso redirigiendo a la página principal.
    // En este caso utilizaremos el componente Navigate (en lugar de la función).
    if (authUser) {
        return <Navigate to="/" />;
    }

    return (
        <MainContainer>
            <Whiteboxanim>
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                    Página de Login
                </h2>

                {/* Formulario de Login */}
                <form
                    onSubmit={handleLoginUser}
                    className="flex flex-col gap-6"
                >
                    {/* Campo Nombre de Usuario */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Nombre de usuario:
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div>
                        <label
                            htmlFor="pass"
                            className="block text-lg font-medium text-gray-700 mb-2"
                        >
                            Contraseña:
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="password"
                            id="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botón de acción */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                        disabled={loading}
                    >
                        Loguearme
                    </button>
                </form>
            </Whiteboxanim>
        </MainContainer>
    );
};

export default LoginPage;
