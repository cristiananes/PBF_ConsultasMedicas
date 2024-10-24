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
        <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/public/fondoaz.jpg')] p-10">
            <div className="max-w-4xl w-full mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl mt-12">
                <H2
                    text="
                    Perfil de usuario"
                />

                <div className=" max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 flex flex-col md:flex-row gap-12 items-start">
                    {/* Avatar del Usuario */}
                    <div className="flex flex-col items-center md:w-1/4">
                        {authUser.avatar ? (
                            <img
                                className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
                                src={`${VITE_API_URL}/${authUser.avatar}`}
                                alt={`Foto de perfil de ${authUser.username}`}
                            />
                        ) : (
                            <img
                                className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
                                src="/default-avatar.png"
                                alt={`Foto de perfil de ${authUser.username}`}
                            />
                        )}
                        {/* Formulario de actualización de avatar */}
                        <form
                            onSubmit={handleUpdateAvatar}
                            className="flex flex-col items-center mt-4"
                        >
                            <input
                                type="file"
                                id="avatar"
                                accept="image/jpeg, image/png"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300"
                                required
                            />
                            <button
                                disabled={loading}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-black transition-colors duration-300 disabled:opacity-50 mb-3"
                            >
                                {loading ? 'Enviando...' : 'Actualizar Avatar'}
                            </button>
                        </form>
                    </div>

                    {/* Información del Usuario */}
                    <div className="flex-1 md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="mt-8">
                            <label className="block text-sm font-medium text-gray-700">
                                Biografía
                            </label>
                            <div className="mt-2 text-lg text-gray-900 bg-gray-100 p-6 rounded-md min-h-[150px] shadow-inner">
                                {authUser.biography ||
                                    'No hay biografía disponible.'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opciones adicionales */}
                <aside className="mt-10 flex justify-center gap-4">
                    <NavLink to="/consults">
                        <button className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-black transition-colors duration-300">
                            Mis consultas
                        </button>
                    </NavLink>
                    {authUser.role === 'admin' && (
                        <button
                            onClick={handleAdminRegister}
                            className="px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors duration-300"
                        >
                            Añadir nuevo empleado
                        </button>
                    )}
                </aside>
            </div>
        </main>
    );
};
export default UserProfilePage;
