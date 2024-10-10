// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useState, useEffect } from 'react';
//Importamos hooks
import { useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos el nombre que le daremos al token.
const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

// Creamos un contexto.
export const AuthContext = createContext(null);

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
  // Declaramos una variable en el State para manejar el token. Tratamos de obtener
  // el valor del localStorage. Si no existe, establecemos un valor null.
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(VITE_AUTH_TOKEN) || null
  );

  // Declaramos una variable en el State para almacenar los datos del usuario.
  const [authUser, setAuthUser] = useState(null);
  const { userId } = useParams();
  // Solicitamos los datos del usuario si existe un token.
  useEffect(() => {
    // Función que obtiene los datos del usuario.
    const fetchUser = async () => {
      try {
        //Comprobamos la id del usuario

        // Obtenemos una respuesta del servidor.
        const res = await fetch(`${VITE_API_URL}/api/user/${userId}`, {
          headers: {
            Authorization: authToken,
          },
        });

        // Obtenemos el body.
        const body = await res.json();

        // Si hubo algún error lo lanzamos.
        if (body.status === 'error') {
          throw new Error(body.message);
        }

        // Establecemos los datos del usuario.
        setAuthUser(body.data.user);
      } catch (err) {
        // Si el token no es correcto lo eliminamos.
        if (err.message === 'Token inválido') {
          // Eliminamos el token del State.
          setAuthToken(null);

          // Eliminamos el token del localStorage.
          localStorage.removeItem(VITE_AUTH_TOKEN);
        }

        // Si hay un error eliminamos el usuario.
        setAuthUser(null);

        toast.error(err.message, {
          id: 'userInfo',
        });
      }
    };

    // Si existe un token, buscamos los datos del usuario.
    if (authToken) {
      fetchUser();
    } else {
      // Vaciamos los datos del usuario.
      setAuthUser(null);
    }
  }, [authToken, userId]);

  // Función que guarda el token.
  const authLoginState = (token) => {
    // Guardamos el token en el State.
    setAuthToken(token);

    // Guardamos el token en el localStorage.
    localStorage.setItem(VITE_AUTH_TOKEN, token);
  };

  // Función que elimina el token.
  const authLogoutState = () => {
    // Eliminamos el token del State.
    setAuthToken(null);

    // Eliminamos el token del localStorage.
    localStorage.removeItem(VITE_AUTH_TOKEN);
  };

  // Función que actualiza el avatar en el State.
  const authUpdateAvatarState = (avatar) => {
    setAuthUser({
      ...authUser,
      avatar,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        authUser,
        authLoginState,
        authLogoutState,
        authUpdateAvatarState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Validamos las props.
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
