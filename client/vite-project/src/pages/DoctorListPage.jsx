<<<<<<< HEAD
import { SearchComponent } from '../components/SearchComponent';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
=======
import { useDoctors } from '../hooks/useDoctors';
// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';
// Importamos moment para manipular fechar.
import { useEffect, useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { Navigate } from 'react-router-dom';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
>>>>>>> a2ad1dd (nuevos componentes creados)
// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
    return (
<<<<<<< HEAD
        <main>
            <h2>Listado de medicos</h2>

                {/* Establecemos las fotos. */}

                <ul>
                    {doctors.map((doctor) => (
                        <li key={doctor.id}>
                            <h3>{doctor.firstName}</h3>
                            <h3>A{doctor.lasName}</h3>
                            <h3>{doctor.userName}</h3>
                            <h3>{doctor.email}</h3>
                            <p>{doctor.specialty}</p>
                        </li>
                    ))}
                </ul>
            </main>
        )
=======
        doctors && (
            <MainContainer>
                <Whiteboxanim>
                    <H2 text="Listado de medicos" />

                    {/* Establecemos las fotos. */}

                    <ul>
                        {doctors.map((doctor) => (
                            <li key={doctor.id}>
                                <h3>{doctor.firstName}</h3>
                                <h3>A{doctor.lasName}</h3>
                                <h3>{doctor.userName}</h3>
                                <h3>{doctor.email}</h3>
                                <p>{doctor.specialty}</p>
                            </li>
                        ))}
                    </ul>
                </Whiteboxanim>
            </MainContainer>
        )
>>>>>>> a2ad1dd (nuevos componentes creados)
    );
};

export default DoctorListPage;
