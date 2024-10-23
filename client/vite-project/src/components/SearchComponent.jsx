import { useState, useEffect, useContext } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { AuthContext } from '../contexts/AuthContext';

const SearchComponent = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { authToken } = useContext(AuthContext);
    // Hacemos fetch de los datos
    const fetchDoctors = async () => {
        const response = useDoctors(authToken);
        const body = await response.json();

        setUsers(body);
    };

    useEffect(() => {
        fetchDoctors();
    });

    return (
        <div>
            <ul>
                {users.map((doctor) => (
                    <li key={doctor.id}>
                        <h3>{doctor.firstName}</h3>
                        <h3>A{doctor.lasName}</h3>z<h3>{doctor.userName}</h3>
                        <h3>{doctor.email}</h3>
                        <p>{doctor.specialty}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
