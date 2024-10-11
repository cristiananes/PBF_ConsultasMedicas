// src/components/ConsultList.jsx
import React, { useEffect, useState } from 'react';

const ConsultList = () => {
    const [consults, setConsults] = useState([]);

    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const response = await fetch('/api/consults'); // Esto hará la solicitud al backend
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setConsults(data);
            } catch (error) {
                console.error('Error fetching consults:', error);
            }
        };

        fetchConsults();
    }, []);

    return (
        <div>
            <h1>Consultas</h1>
            <ul>
                {consults.map((consult) => (
                    <li key={consult.id}>
                        <h2>{consult.title}</h2>
                        <p>{consult.description}</p>
                        <p>Urgencia: {consult.urgency}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultList;
