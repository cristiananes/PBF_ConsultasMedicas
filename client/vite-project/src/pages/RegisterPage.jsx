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
const RegisterPage = () => {
  // Importamos los datos del usuario.
  const { authUser } = useContext(AuthContext);

  // Importamos la función navigate.
  const navigate = useNavigate();

  // Declaramos una variable en el State para definir el valor de cada input.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPass, setRepeatedPass] = useState("");

  // Variable que indica cuando termina el fetch.
  const [loading, setLoading] = useState(false);

  // Función que maneje el envío del formulario.
  const handleRegisterUser = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Si las contraseñas no coinciden lanzamos un error.
      if (password !== repeatedPass) {
        throw new Error("Las contraseñas no coinciden");
      }

      // Indicamos que va a dar comienzo el fetch.
      setLoading(true);

      // Obtenemos una respuesta.
      const res = await fetch(`${VITE_API_URL}/api/user/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      });

      // Obtenemos el body.
      const body = await res.json();

      // Si hubo algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }

      // Redirigimos a la página de login.
      navigate("/login");

      // Si todo va bien mostramos un mensaje indicándolo.
      toast.success(body.message, {
        id: "register",
      });
    } catch (err) {
      toast.error(err.message, {
        id: "register",
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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">
          Página de registro
        </h2>
      </div>

      <form onSubmit={handleRegisterUser} className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="text-lg font-medium text-gray-700"
          >
            Nombre:
          </label>
          <input
            type="text"
            id="firstName"
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="text-lg font-medium text-gray-700"
          >
            Apellido:
          </label>
          <input
            type="text"
            id="lastName"
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label
            htmlFor="username"
            className="text-lg font-medium text-gray-700"
          >
            Usuario:
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 flex flex-col">
          <label htmlFor="email" className="text-lg font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="pass" className="text-lg font-medium text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            id="pass"
            className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="col-span-2 flex flex-col"></div>
        <label
          htmlFor="repeatedPass"
          className="text-lg font-medium text-gray-700"
        >
          Repetir contraseña:
        </label>
        <input
          type="password"
          id="repeatedPass"
          className="border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={repeatedPass}
          onChange={(e) => setRepeatedPass(e.target.value)}
          required
        />

        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        <button
          disabled={loading}
          className="col-span-2 w-full bg-blue-700 text-white rounded-md px-6 py-3 mt-4 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
        >
          Registrarme
        </button>
      </form>
    </main>
  );
};

export default RegisterPage;
