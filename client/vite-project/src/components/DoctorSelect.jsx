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
                    <li key={doctor.id} onClick={() => onDoctorSelect(doctor)}>
                        <button>
                            <h3>Selecciona este doctor</h3>
                            <h3>
                                {doctor.firstName} {doctor.lastName}
                            </h3>
                            <h3>{doctor.username}</h3>

                            <h3>{doctor.specialty}</h3>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
