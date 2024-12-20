import { SearchComponent } from '../components/SearchComponent';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
const { VITE_API_URL } = import.meta.env;

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import Whitebox from '../components/Whitebox';

// Inicializamos el componente.
const DoctorListPage = () => {
    // Estado para almacenar los doctores
    const [doctors, setDoctors] = useState([]);
    const { authToken } = useContext(AuthContext); // Usamos el contexto para obtener el token de autenticación

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Obtenemos una respuesta del servidor.
                const res = await fetch(`${VITE_API_URL}/api/users/doctors`, {
                    method: 'get',
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Obtenemos el body de la ruta anteriormente seleccionada
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Almacenamos los doctores en el estado
                setDoctors(body.data.users);
            } catch (err) {
                toast.error(`Error fetching doctors: ${err.message}`);
            }
        };

        fetchDoctors();
    }, [authToken]);

    return (
        doctors && (
            <MainContainer className="flex flex-col items-center justify-center min-h-screen">
                <Whiteboxanim className="w-full max-w-lg p-6 ">
                    <H2
                        text="Listado de medicos"
                        className="text-center mb-6"
                    />
                    <Whitebox className="flex justify-center">
                        <SearchComponent
                            rating={true}
                            className="w-full max-w-xs"
                        />
                    </Whitebox>
                </Whiteboxanim>
            </MainContainer>
        )
    );
};

export default DoctorListPage;
