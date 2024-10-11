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
const NewConsultPage = () => {
  // Obtenemos los datos del usuario y el token.
  const { authUser, authToken } = useContext(AuthContext);

  // Importamos la función navigate.
  const navigate = useNavigate();

  // Declaramos una variable en el State para cada input.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [userId, setUserId] = useState("");
  const [file, setFile] = useState(null);

  // Variable que indica cuando termina el fetch de crear una nueva entrada.
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario.
  const handleAddEntry = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Para enviar archivos debemos crear un objeto de tipo FormData.
      const formData = new FormData();

      // Ahora agregamos las propiedades y valores al objeto anterior.
      formData.append("title", title);
      formData.append("description", description);
      formData.append("urgency", urgency);
      formData.append("specialty", specialty);
      formData.append("userId", userId);

      // Las propiedades de las fotos las crearemos solo si existe la foto.
      file && formData.append("file", file);

      // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
      setLoading(true);

      // Obtenemos la respuesta del servidor.
      const res = await fetch(`${VITE_API_URL}/api/consults`, {
        method: "post",
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

      // Redirigimos a la página principal.
      navigate("/");

      // Mostramos un mensaje satisfactorio al usuario.
      toast.success(body.message, {
        id: "newConsult",
      });
    } catch (err) {
      toast(err.message, {
        id: "newConsult",
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
      <h2>Página de nueva consulta</h2>

      <form onSubmit={handleAddEntry}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <label htmlFor="urgency">Urgencia:</label>
        <input
          type="text"
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          required
        />

        <label htmlFor="specialty">Especialidad:</label>
        <input
          type="text"
          id="specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        />

        <label htmlFor="userId">Id de usuario:</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />

        <label htmlFor="file">Archivo:</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/jpeg, image/png"
        />

        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        <button disabled={loading}>Crear entrada</button>
      </form>
    </main>
  );
};

export default NewConsultPage;
