// Importamos los hooks.
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const ActivateUserPage = () => {
  // Importamos la función navigate.
  const navigate = useNavigate();

  // Obtenemos el path param con el código de registro.
  const { registrationCode } = useParams();
  console.log(registrationCode);

  // Utilizamos "useEffect" para validar al usuario cuando se monte el componente.
  useEffect(() => {
    const fetchValidateUser = async () => {
      try {
        // Obtenemos una respuesta.
        const res = await fetch(
          `${VITE_API_URL}/api/user/validate/${registrationCode}`,
          {
            method: 'PATCH',
          }
        );

        // Obtenemos el body.
        const body = await res.json();

        // Si hay algún error lo lanzamos.
        if (body.status === 'error') {
          throw new Error(body.message);
        }

        // Si todo ha ido bien mostramos un mensaje al usuario.
        toast.success(body.message, {
          id: 'activateUser',
        });
      } catch (err) {
        toast.error(err.message, {
          id: 'activateUser',
        });
      } finally {
        // Tanto si la activación ha sido un éxito como si no, redirigimos a login.
        navigate('/login');
      }
    };

    // Llamamos a la función anterior.
    fetchValidateUser();
  }, [registrationCode, navigate]);

  return (
    <main>
      <h2>Página activación de usuario</h2>
    </main>
  );
};

export default ActivateUserPage;
