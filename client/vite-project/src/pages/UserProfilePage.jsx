import { ButtonAction } from '../components/ButtonAction';
// Importamos los hooks.
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// Obtenemos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos los componentes.
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

//importamos componente H2
import { H2 } from '../components/H2';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
    // Obtenemos los datos del usuario, el token y la función que actualiza el avatar.
    const { authUser, authToken, authUpdateAvatarState } =
        useContext(AuthContext);
    console.log('Usuario:', authUser);

    const navigate = useNavigate();
    // Declaramos una variable en el State para almacenar el valor del input.
    const [avatar, setAvatar] = useState(null);

    // Variable que indica cuando termina el fetch de crear una nueva entrada.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleUpdateAvatar = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Creamos un objeto FormData.
            const formData = new FormData();

            // Adjuntamos el avatar como propiedad del objeto anterior.
            formData.append('avatar', avatar);

            // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
            setLoading(true);

            // Obtenemos una respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/user/avatar`, {
                method: 'put',
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

            // Actualizamos el avatar del usuario en el State.
            authUpdateAvatarState(body.data.avatar);

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'userProfile',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'userProfile',
            });
        } finally {
            // Indicamos que ha finalizado el fetch para habilitar el botón.
            setLoading(false);
        }
    };
    const handleAdminRegister = () => {
        navigate('/admin-register');
    };

    // Si NO estamos logueados redirigimos a la página de login.
    if (!authUser) return <Navigate to="/login" />;

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-eggblue to-ultraviolet p-10">
            <div className="max-w-full w-full mx-auto p-6 bg-white shadow-md rounded-md mt-10 px-6 ">
                <H2 text="Perfil de usuario" />

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar del Usuario */}
                    <div className="flex flex-col items-center">
                        {
                            // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos
                            // un avatar por defecto.
                            authUser.avatar ? (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                    src={`${VITE_API_URL}/${authUser.avatar}`}
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            ) : (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                    src="/default-avatar.png"
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            )
                        }
                    </div>
                </div>

                <form
                    onSubmit={handleUpdateAvatar}
                    className="flex flex-col items-center"
                >
                    <label
                        htmlFor="avatar"
                        className="mb-2 text-sm font-medium text-gray-700"
                    >
                        Actualizar avatar
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        accept="image/jpeg, image/png"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                        required
                    />
                    {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                    <button
                        disabled={loading}
                        className="mt-4 px-4 py-2 bg-trueblue text-white font-bold rounded-md hover: to-black disabled:opacity-50"
                    >
                        {loading ? 'Enviando...' : 'Actualizar Avatar'}
                    </button>
                </form>
                {authUser.role === 'admin' && (
                    <button onClick={handleAdminRegister}>
                        Añadir nuevo empleado
                    </button>
                )}
                {/* Información del Usuario */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <p className="mt-1 text-lg text-gray-900">
                                {authUser.firstName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Apellidos
                            </label>
                            <p className="mt-1 text-lg text-gray-900">
                                {authUser.lastName}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Usuario
                            </label>
                            <p className="mt-1 text-lg text-gray-900">
                                {authUser.username}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <p className="mt-1 text-lg text-gray-900">
                                {authUser.email}
                            </p>
                        </div>
                    </div>

                    {/* Biografía */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Biografía
                        </label>
                        <p className="mt-1 text-lg text-gray-900 bg-gray-100 p-4 rounded-md">
                            {authUser.biography ||
                                'No hay biografía disponible.'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Botón para añadir nuevo empleado si el usuario es admin */}
            {authUser.role === 'admin' && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleAdminRegister}
                        className="px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
                    >
                        Añadir nuevo empleado
                    </button>
                </div>
            )}

            <aside>
                <NavLink to="/consults">
                    <ButtonAction text="Consultas" />
                </NavLink>
            </aside>
        </main>
    );
};
export default UserProfilePage;
