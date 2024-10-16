import { useConsults } from '../hooks/useConsults';
// Importamos el contexto.
/* import { AuthContext } from "../contexts/AuthContext"; */
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
/* import { Navigate } from "react-router-dom"; */

// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const ConsultListPage = () => {
    const { authToken } = useContext(AuthContext);
    //Aqui tengo que extraer la lista de doctores del params
    const [consults, setConsutls] = useState([]);
    // Importamos los datos de los doctores.
    //saco las variables
    const fetchConsults = async () => {
        try {
            const response = await useConsults({ authToken });
            setConsutls(response);
        } catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(() => {
        fetchConsults();
    }, []);

    // Declaramos una variable para indicar cuando estamos haciendo fetch al servidor y poder
    // deshabilitar así los botones durante ese proceso.

    /*   if (!authUser) {
    return <Navigate to="/login" />;
  } */

    return (
        consults && (
            <main>
                <h2>Listado de consultas</h2>

                {/* Establecemos las fotos. */}

                <ul>
                    {consults.map((consult) => (
                        <li key={consult.id}>
                            <h3>{consult.title}</h3>
                            <h3>{consult.description}</h3>

                            <h3>{consult.author}</h3>
                            <Link to={`/consult/${consult.id}`}>Ver</Link>
                        </li>
                    ))}
                </ul>
            </main>
        )
    );
};

export default ConsultListPage;
