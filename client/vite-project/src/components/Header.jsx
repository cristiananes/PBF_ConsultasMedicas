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
    <header className="flex place-content-between">
      <h1>
        <NavLink className="text-3xl font-bold underline" to="/">
          Consalut: Tus consultas sobre salud
        </NavLink>
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
        <ul className="flex gap-2">
          {
            // Mostramos unos botones de navegación u otros en función de si estamos
            // o no logeados.
            authUser ? (
              <>
                <li>
                  <NavLink
                    to="/user/:userId"
                    className="border-solid border-2 border-green-400 rounded-md px-2"
                  >
                    Perfil de usuario
                  </NavLink>
                </li>
                <button
                  className="border-solid border-2 border-red-600 rounded-md px-2"
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
                  <NavLink
                    to="/register"
                    className="border-solid boder-2 border-sky-700 rounded-md px-4"
                  >
                    Registro
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="border-solid boder-2 border-blue-500 rounded-md px-4 bg-slate-300 hover:bg-sky-500"
                  >
                    Login
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
