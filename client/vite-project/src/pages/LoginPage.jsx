// Importamos los hooks.
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Importamos el contexto.
import { AuthContext } from "../contexts/AuthContext";

// Importamos la función toast.
import toast from "react-hot-toast";

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const LoginPage = () => {
  // Importamos los datos del usuario y la función que almacena el token.
  const { authUser, authLoginState } = useContext(AuthContext);

  // Importamos la función navigate.
  const navigate = useNavigate();

  // Declaramos una variable en el State para definir el valor de cada input.
  const [username, setUsername] = useState(""); // Cambiado de email a username
  const [password, setPassword] = useState("");

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
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // Cambiado de email a username
          password,
        }),
      });

      // Obtenemos el body.
      const body = await res.json();

      // Si hubo algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }

      // Almacenamos el token en el State y en el localStorage.
      authLoginState(body.data.token);

      // Redirigimos a la página principal.
      navigate("/");
    } catch (err) {
      toast.error(err.message, {
        id: "login",
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
    <main className="flex">
      <h2 className="flex gap-2 place-content-start ">Página de login</h2>

      <form onSubmit={handleLoginUser}>
        <label htmlFor="username">Nombre de usuario:</label>{" "}
        <input
          className="border-solid border-2 rounded-md px-2"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="pass">Contraseña:</label>
        <input
          className="border-solid border-2 rounded-md px-2"
          type="password"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        <button
          className="border-solid border-2 rounded-lg px-6 py-3 bg-sky-700 text-white shadow-lg hover:shadow-xl hover:bg-sky-800 active:bg-sky-900 focus-visible:ring-4 focus-visible:ring-sky-400 transition duration-300"
          disabled={loading}
        >
          Loguearme
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
