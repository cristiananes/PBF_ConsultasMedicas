// Importamos los hooks.
import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
// Obtenemos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos los componentes.
import { useNavigate } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos componentes
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
    // Obtenemos los datos del usuario, el token y la función que actualiza el avatar.
    const { authUser, authToken, authUpdateAvatarState, authUpdateUserInfo } =
        useContext(AuthContext);
    console.log('Usuario:', authUser);

    const navigate = useNavigate();
    // Declaramos una variable en el State para almacenar el valor del input.
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Estado para el modo de edición
    const [formData, setFormData] = useState({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        username: authUser.username,
        biography: authUser.biography || '', // Añadimos biografía
    });

    // Función que maneja el envío del formulario para actualizar el avatar
    const handleUpdateAvatar = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append('avatar', avatar);

            setLoading(true);
            const res = await fetch(`${VITE_API_URL}/api/user/avatar`, {
                method: 'put',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            const body = await res.json();
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            authUpdateAvatarState(body.data.avatar);
            toast.success(body.message, { id: 'userProfile' });
        } catch (err) {
            toast.error(err.message, { id: 'userProfile' });
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar el envío del formulario de edición
    const handleUpdateUserInfo = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${VITE_API_URL}/api/user/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken,
                },
                body: JSON.stringify(formData),
            });

            const body = await res.json();
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Actualizamos el contexto con la nueva información
            authUpdateUserInfo(formData);
            toast.success(body.message, { id: 'userProfile' });
            setIsEditing(false); // Salimos del modo de edición
        } catch (err) {
            toast.error(err.message, { id: 'userProfile' });
        }
    };

    const handleAdminRegister = () => {
        navigate('/admin-register');
    };

    return (
        <MainContainer>
            <div className="max-w-4xl w-full mx-auto p-8 bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl mt-12">
                <H2 text="Perfil de usuario" />

                <div className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 px-6 flex flex-col md:flex-row gap-12 items-start">
                    {/* Avatar del Usuario */}
                    <div className="flex flex-col items-center md:w-1/4">
                        <img
                            className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
                            src={
                                authUser.avatar
                                    ? `${VITE_API_URL}/${authUser.avatar}`
                                    : '/public/default-avatar.jpg'
                            }
                            alt={`Foto de perfil de ${authUser.username}`}
                        />
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
                        {/* Información y edición del Usuario */}
                        {isEditing ? (
                            <form
                                onSubmit={handleUpdateUserInfo}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                firstName: e.target.value,
                                            })
                                        }
                                        className="mt-1 text-lg text-gray-900 border border-gray-300 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                lastName: e.target.value,
                                            })
                                        }
                                        className="mt-1 text-lg text-gray-900 border border-gray-300 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Usuario
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="mt-1 text-lg text-gray-900 border border-gray-300 p-2 rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {authUser.email}
                                    </p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Biografía
                                    </label>
                                    <textarea
                                        value={formData.biography}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                biography: e.target.value,
                                            })
                                        }
                                        className="mt-1 text-lg text-gray-900 border border-gray-300 p-2 rounded-md min-h-[100px]"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition-colors duration-300"
                                    >
                                        Guardar Cambios
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="ml-4 px-6 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
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
                                <div className="col-span-2 mt-8">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors duration-300"
                                    >
                                        Editar Información
                                    </button>
                                </div>
                                {/* Biografía */}
                                <div className="col-span-2 mt-8">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Biografía
                                    </label>
                                    <div className="mt-2 text-lg text-gray-900 bg-gray-100 p-6 rounded-md min-h-[150px] shadow-inner">
                                        {authUser.biography ||
                                            'No hay biografía disponible.'}
                                    </div>
                                </div>
                            </div>
                        )}
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
        </MainContainer>
    );
};

export default UserProfilePage;
