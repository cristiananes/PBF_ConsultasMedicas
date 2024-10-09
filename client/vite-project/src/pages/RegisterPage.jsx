// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RegisterPage = () => {
  // Importamos los datos del usuario.
  const { authUser } = useContext(AuthContext);

  // Importamos la función navigate.
  const navigate = useNavigate();

  // Declaramos una variable en el State para definir el valor de cada input.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');

  // Variable que indica cuando termina el fetch.
  const [loading, setLoading] = useState(false);

  // Función que maneje el envío del formulario.
  const handleRegisterUser = async (e) => {
    try {
      // Prevenimos el comportamiento por defecto del formulario.
      e.preventDefault();

      // Si las contraseñas no coinciden lanzamos un error.
      if (password !== repeatedPass) {
        throw new Error('Las contraseñas no coinciden');
      }

      // Indicamos que va a dar comienzo el fetch.
      setLoading(true);

      // Obtenemos una respuesta.
      const res = await fetch(`${VITE_API_URL}/api/user/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
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
      if (body.status === 'error') {
        throw new Error(body.message);
      }

      // Redirigimos a la página de login.
      navigate('/login');

      // Si todo va bien mostramos un mensaje indicándolo.
      toast.success(body.message, {
        id: 'register',
      });
    } catch (err) {
      toast.error(err.message, {
        id: 'register',
      });
    } finally {
      // Indicamos que ha finalizado el fetch.
      setLoading(false);
    }
  };

  // Si estamos logeados restringimos el acceso redirigiendo a la página principal.
  // En este caso utilizaremos el componente Navigate (en lugar de la función).
  if (authUser) {
    return <Navigate to='/' />;
  }

  return (
    <main>
      <h2>Página de registro</h2>

      <form onSubmit={handleRegisterUser}>
        <label htmlFor='firstName'>Nombre:</label>
        <input
          type='text'
          id='firstName'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label htmlFor='lastName'>Apellido:</label>
        <input
          type='text'
          id='lastName'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label htmlFor='username'>Usuario:</label>
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='pass'>Contraseña:</label>
        <input
          type='password'
          id='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor='repeatedPass'>Repetir contraseña:</label>
        <input
          type='password'
          id='repeatedPass'
          value={repeatedPass}
          onChange={(e) => setRepeatedPass(e.target.value)}
          required
        />

        {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
        <button disabled={loading}>Registrarme</button>
      </form>
    </main>
  );
};

export default RegisterPage;
