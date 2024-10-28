// Importamos los hooks.
import { useContext } from 'react';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

//Importamos abreviaturas tailwind.
import { ButtonAction } from './ButtonAction';

// Inicializamos el componente.
const Header = () => {
    // Importamos los datos del usuario y la función de logout.
    const { authUser, authLogoutState } = useContext(AuthContext);

    return (
        <header className="flex items-center place-content-between bg-white p-4">
            <h1>
                <NavLink className="text-3xl font-bold" to="/">
                    Consalut: Tus consultas sobre salud
                </NavLink>
            </h1>

            {authUser && (
                <div className="user-info">
                    {
                        // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos
                        // un avatar por defecto.
                        authUser.avatar ? (
                            <NavLink to={`/user/:userId`}>
                                <img
                                    src={`${VITE_API_URL}/${authUser.avatar}`}
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            </NavLink>
                        ) : (
                            <NavLink to={`/user/:userId`}>
                                <img
                                    src="/default-avatar.png"
                                    alt={`Foto de perfil de ${authUser.username}`}
                                />
                            </NavLink>
                        )
                    }
                    <p>@{authUser.username}</p>
                </div>
            )}

            <nav>
                <ul className="flex gap-2">
                    {
                        // Mostramos unos botones de navegación u otros en función de si estamos
                        // o no logeados.
                        authUser ? (
                            <>
                                <li>
                                    <NavLink to="/user/:userId">
                                        <ButtonAction text="Perfil de usuario" />
                                    </NavLink>
                                </li>

                                <NavLink
                                    to="/login"
                                    onClick={() => {
                                        authLogoutState();
                                    }}
                                >
                                    <ButtonAction text="Log out" />
                                </NavLink>
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
                                        <ButtonAction text="Registro" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">
                                        <ButtonAction text="Login" />
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
