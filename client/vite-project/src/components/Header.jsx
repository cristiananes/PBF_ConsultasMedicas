// Importamos los hooks.
import { useContext } from 'react';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';
import { ButtonAction } from '../components/ButtonAction';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

//Importamos abreviaturas tailwind.
//import { ButtonAction } from './ButtonAction';

// Inicializamos el componente.
const Header = () => {
    // Importamos los datos del usuario y la función de logout.
    const { authUser, authLogoutState } = useContext(AuthContext);

    return (
        <header className="flex items-center justify-between bg-blue-50 p-6 shadow-lg">
            <h1>
                <NavLink
                    className="text-3xl font-bold text-blue-700 hover:text-blue-900 transition"
                    to="/"
                >
                    Consalut: Tus consultas médicas
                </NavLink>
            </h1>

            {authUser && (
                <div className="flex items-center gap-4">
                    {
                        // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos un avatar por defecto.
                        authUser.avatar ? (
                            <NavLink to={`/user/:userId`}>
                                <img
                                    className="w-12 h-12 rounded-full shadow-md"
                                    src={`${VITE_API_URL}/${authUser.avatar}`}
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            </NavLink>
                        ) : (
                            <NavLink to={`/user/:userId`}>
                                <img
                                    className="w-12 h-12 rounded-full shadow-md"
                                    src={'/public/default-avatar.jpg'}
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            </NavLink>
                        )
                    }
                    <p className="text-gray-600">@{authUser.username}</p>
                </div>
            )}

            <nav>
                <ul className="flex gap-4">
                    {
                        // Mostramos unos botones de navegación u otros en función de si estamos o no logeados.
                        authUser ? (
                            <>
                                <li>
                                    <NavLink to="/user/:userId">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition">
                                            Perfil de usuario
                                        </button>
                                    </NavLink>
                                </li>

                                <li>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition"
                                        onClick={() => {
                                            authLogoutState();
                                        }}
                                    >
                                        Log out
                                    </button>
                                </li>

                                {/* Botón para añadir nuevo empleado si el usuario es admin */}
                                {authUser.role === 'admin' && (
                                    <div className="mt-8 text-center">
                                        <li>
                                            <NavLink to="/admin-register">
                                                <ButtonAction text="Herramientas de administrador" />
                                            </NavLink>
                                        </li>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition">
                                            Registro
                                        </button>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition">
                                            Login
                                        </button>
                                    </NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
