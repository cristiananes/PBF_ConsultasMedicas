import { useState, useEffect, useContext } from 'react';
const { VITE_API_URL } = import.meta.env;
import { AuthContext } from '../contexts/AuthContext';

export const DoctorSelect = ({ onDoctorSelect }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { authToken } = useContext(AuthContext);

    const fetchDoctors = async () => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/users/doctors`, {
                method: 'get',
                headers: {
                    Authorization: authToken,
                },
            });

            const body = await res.json();
            if (body.status === 'error') throw new Error(body.message);

            setUsers(body.data.users);
            return body.data.users;
        } catch (err) {
            return err.message;
        }
    };

    const searcher = (e) => setSearch(e.target.value);

    const searchResults = !search
        ? users
        : users.filter(
              (data) =>
                  data.username.toLowerCase().includes(search.toLowerCase()) ||
                  data.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  data.lastName.toLowerCase().includes(search.toLowerCase())
          );

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="flex flex-col items-center p-6">
            {/* Campo de búsqueda centrado y estilizado */}
            <input
                className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                style={{ minWidth: '250px' }}
                value={search}
                onChange={searcher}
                type="text"
                placeholder="Introduce el nombre del doctor"
            />

            {/* Lista de doctores */}
            <ul className="w-full max-w-2xl space-y-4">
                {searchResults.map((doctor) => (
                    <li
                        key={doctor.id}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                        <button
                            onClick={() => onDoctorSelect(doctor)}
                            className="w-full text-left"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 underline">
                                Selecciona este doctor
                            </h3>
                            <div className="mt-2">
                                <p className="text-gray-700 font-medium">
                                    {doctor.firstName} {doctor.lastName}
                                </p>
                                <p className="text-gray-600">
                                    {doctor.username}
                                </p>
                                <p className="text-gray-600 font-semibold">
                                    {doctor.specialty}
                                </p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
