// Importamos los hooks.
import { useContext } from "react";

// Importamos los componentes.
import { NavLink } from "react-router-dom";

// Importamos el contexto.
import { AuthContext } from "../contexts/AuthContext";

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const Header = () => {
  // Importamos los datos del usuario y la función de logout.
  const { authUser, authLogoutState } = useContext(AuthContext);

  return (
    <header>
      <h1>
        <NavLink to="/">Consalut: Tus consultas sobre salud</NavLink>
      </h1>

      {authUser && (
        <div className="user-info">
          {
            // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos
            // un avatar por defecto.
            authUser.avatar ? (
              <img
                src={`${VITE_API_URL}/${authUser.avatar}`}
                alt={`Foto de perfil de ${authUser.username}`}
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt={`Foto de perfil de ${authUser.username}`}
              />
            )
          }
          <p>@{authUser.username}</p>
        </div>
      )}

      <nav>
        <ul>
          {
            // Mostramos unos botones de navegación u otros en función de si estamos
            // o no logeados.
            authUser ? (
              <>
                <li>
                  <NavLink to="/user/:userId">Perfil de usuario</NavLink>
                </li>
                <button
                  onClick={() => {
                    authLogoutState();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Registro</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
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
