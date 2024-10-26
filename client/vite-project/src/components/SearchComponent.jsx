import { useState, useEffect, useContext } from 'react';
const { VITE_API_URL } = import.meta.env;
import { AuthContext } from '../contexts/AuthContext';

export const SearchComponent = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { authToken } = useContext(AuthContext);
    // Hacemos fetch de los datos
    const fetchDoctors = async () => {
        try {
            // Obtenmemos una respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/users/doctors`, {
                method: 'get',
                headers: {
                    Authorization: authToken,
                },
            });

            // Obtenemos el body de la ruta anteriormete seleccionada
            const body = await res.json();
            console.log(body);

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Almacenamos los doctores.
            setUsers(body.data.users);

            return body.data.users;
        } catch (err) {
            return err.message;
        }
    };

    const searcher = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    let searchResults = [];
    if (!search) {
        searchResults = users;
    } else {
        searchResults = users.filter(
            (data) =>
                data.username.toLowerCase().includes(search.toLowerCase()) ||
                data.firstName.toLowerCase().includes(search.toLowerCase()) ||
                data.lastName.toLowerCase().includes(search.toLowerCase())
        );
    }
    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div>
            <input
                style={{ minWidth: '250px' }}
                value={search}
                onChange={searcher}
                type="text"
                placeholder="Introduce el nombre del doctor"
            ></input>
            <ul>
                {searchResults.map((doctor) => (
                    <li key={doctor.id}>
                        <p>=======</p>
                        <div className="flex flex-col items-center">
                            {
                                // Si el usuario tiene avatar lo mostramos, de lo contrario ponemos
                                // un avatar por defecto.
                                doctor.avatar ? (
                                    <img
                                        className="w-32 h-32 rounded-full object-cover mb-4"
                                        src={`${VITE_API_URL}/${doctor.avatar}`}
                                        alt={`Foto de perfil de ${doctor.username}`}
                                    />
                                ) : (
                                    <img
                                        className="w-32 h-32 rounded-full object-cover mb-4"
                                        src="/default-avatar.png"
                                        alt={`Foto de perfil de ${doctor.username}`}
                                    />
                                )
                            }
                        </div>
                        <h3>{doctor.firstName}</h3>
                        <h3>{doctor.lastName}</h3>
                        <h3>{doctor.username}</h3>
                        <h3>{doctor.email}</h3>
                        <h3>{doctor.specialty}</h3>
                    </li>
                ))}
            </ul>
        </div>
    );
};
