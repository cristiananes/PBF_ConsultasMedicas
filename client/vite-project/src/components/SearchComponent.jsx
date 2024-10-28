import { useState, useEffect, useContext } from 'react';
const { VITE_API_URL } = import.meta.env;
import { AuthContext } from '../contexts/AuthContext';

export const SearchComponent = ({ rating }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { authToken } = useContext(AuthContext);

    // Fetch de los datos de los doctores.
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(`${VITE_API_URL}/api/users/doctors`, {
                    method: 'get',
                    headers: {
                        Authorization: authToken,
                    },
                });
                const body = await res.json();
                console.log(body);

                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                setUsers(body.data.users);
            } catch (err) {
                console.error(`Error fetching doctors: ${err.message}`);
            }
        };
        fetchDoctors();
    }, [authToken]);

    // Manejo del input de búsqueda
    const searcher = (e) => {
        setSearch(e.target.value);
    };

    // Filtrado de resultados de búsqueda
    const searchResults = !search
        ? users
        : users.filter(
              (data) =>
                  data.username.toLowerCase().includes(search.toLowerCase()) ||
                  data.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  data.lastName.toLowerCase().includes(search.toLowerCase())
          );

    return (
        <div>
            <input
                style={{ minWidth: '250px' }}
                value={search}
                onChange={searcher}
                type="text"
                placeholder="Introduce el nombre del doctor"
            />
            <ul>
                {searchResults.map((doctor) => (
                    <li key={doctor.id}>
                        <div className="flex flex-col items-center">
                            {doctor.avatar ? (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                    src={`${VITE_API_URL}/${doctor.avatar}`}
                                    alt={`Foto de perfil de ${doctor.username}`}
                                />
                            ) : (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4"
                                    src="/default-avatar.jpg"
                                    alt={`Foto de perfil de ${doctor.username}`}
                                />
                            )}
                        </div>
                        <h3>{doctor.firstName}</h3>
                        <h3>{doctor.lastName}</h3>
                        <h3>{doctor.username}</h3>
                        <h3>{doctor.email}</h3>
                        <h3>{doctor.specialty}</h3>
                        {rating && doctor.rating && (
                            <h3>Rating: {doctor.rating}</h3>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
