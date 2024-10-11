// Importamos los hooks.
import { useContext, useState } from "react";

// Obtenemos el contexto.
import { AuthContext } from "../contexts/AuthContext";

// Importamos los componentes.
import { Navigate } from "react-router-dom";

// Importamos la función toast.
import toast from "react-hot-toast";

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
  // Obtenemos los datos del usuario, el token y la función que actualiza el avatar.
  const { authUser } = useContext(AuthContext);

  // Declaramos una variable en el State para almacenar el valor del input.
  const [avatar, setAvatar] = useState(null);

  // Variable que indica cuando termina el fetch de crear una nueva entrada.
  const [loading, setLoading] = useState(false);

  //Función que maneja el envío del formulario.
  const handleUpdateAvatar = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto.
      e.preventDefault();

      // Creamos un objeto FormData.
      const formData = new FormData();

      // Adjuntamos el avatar como propiedad del objeto anterior.
      formData.append("avatar", avatar);

      // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
      setLoading(true);

      // Obtenemos una respuesta del servidor.
      const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
        method: "put",
        headers: {
          Authorization: authToken,
        },
        body: formData,
      });

      // Obtenemos el body.
      const body = await res.json();

      // Si hubo algún error lo lanzamos.
      if (body.status === "error") {
        throw new Error(body.message);
      }

      // Actualizamos el avatar del usuario en el State.
      authUpdateAvatarState(body.data.avatar);

      // Mostramos un mensaje satisfactorio al usuario.
      toast.success(body.message, {
        id: "userProfile",
      });
    } catch (err) {
      toast.error(err.message, {
        id: "userProfile",
      });
    } finally {
      // Indicamos que ha finalizado el fetch para habilitar el botón.
      setLoading(false);
    }
  };

  // Si NO estamos logueados redirigimos a la página de login.
  if (!authUser) return <Navigate to="/login" />;

  return (
    <main>
      <h2>Página de perfil</h2>

      <div>
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
      </div>

      <form onSubmit={handleUpdateAvatar}>
        <label htmlFor="avatar">Actualizar avatar</label>
        <input
          type="file"
          id="avatar"
          accept="image/jpeg, image/png"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />
        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        <button disabled={loading}>Enviar</button>
      </form>

      <ul>
        <li>Usuario: {authUser.username}</li>
        <li>Email: {authUser.email}</li>
        <li>Nombre: {authUser.firstName}</li>
        <li>Apellidos: {authUser.lastName}</li>
        <li>Biografía: {authUser.biography}</li>
      </ul>
    </main>
  );
};

export default UserProfilePage;
