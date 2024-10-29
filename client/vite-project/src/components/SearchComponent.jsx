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

    // return (
    //     <div>
    //         <input
    //             style={{ minWidth: '250px' }}
    //             value={search}
    //             onChange={searcher}
    //             type="text"
    //             placeholder="Introduce el nombre del doctor"
    //         />
    //         <ul>
    //             {searchResults.map((doctor) => (
    //                 <li key={doctor.id}>
    //                     <div className="flex flex-col items-center">
    //                         {doctor.avatar ? (
    //                             <img
    //                                 className="w-32 h-32 rounded-full object-cover mb-4"
    //                                 src={`${VITE_API_URL}/${doctor.avatar}`}
    //                                 alt={`Foto de perfil de ${doctor.username}`}
    //                             />
    //                         ) : (
    //                             <img
    //                                 className="w-32 h-32 rounded-full object-cover mb-4"
    //                                 src="/default-avatar.jpg"
    //                                 alt={`Foto de perfil de ${doctor.username}`}
    //                             />
    //                         )}
    //                     </div>
    //                     <h3>{doctor.firstName}</h3>
    //                     <h3>{doctor.lastName}</h3>
    //                     <h3>{doctor.username}</h3>
    //                     <h3>{doctor.email}</h3>
    //                     <h3>{doctor.specialty}</h3>
    //                     {rating && doctor.rating && (
    //                         <h3>Rating: {doctor.rating}</h3>
    //                     )}
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    //);
    return (
        <div className="flex flex-col items-center p-6">
            {/* Campo de búsqueda centrado */}
            <input
                style={{ minWidth: '250px' }}
                value={search}
                onChange={searcher}
                type="text"
                placeholder="Introduce el nombre del doctor"
                className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Lista de doctores */}
            <ul className="w-full max-w-2xl space-y-6">
                {searchResults.map((doctor) => (
                    <li
                        key={doctor.id}
                        className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center border border-gray-200"
                    >
                        {/* Foto del doctor */}
                        <div className="flex flex-col items-center mb-4">
                            {doctor.avatar ? (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-white shadow-md"
                                    src={`${VITE_API_URL}/${doctor.avatar}`}
                                    alt={`Foto de perfil de ${doctor.username}`}
                                />
                            ) : (
                                <img
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-white shadow-md"
                                    src="/default-avatar.jpg"
                                    alt={`Foto de perfil de ${doctor.username}`}
                                />
                            )}
                        </div>

                        {/* Información del doctor */}
                        <h3 className="text-lg font-semibold text-gray-800">
                            {doctor.firstName} {doctor.lastName}
                        </h3>
                        <p className="text-gray-600">{doctor.username}</p>
                        <p className="text-gray-600">{doctor.email}</p>
                        <p className="text-gray-600">{doctor.specialty}</p>

                        {/* Rating del doctor */}
                        {rating && doctor.rating && (
                            <p className="text-yellow-500 font-medium">
                                Rating: {doctor.rating}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
