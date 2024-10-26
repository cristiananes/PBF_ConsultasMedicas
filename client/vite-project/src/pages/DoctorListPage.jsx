import { SearchComponent } from '../components/SearchComponent';
import { H2 } from '../components/H2';
import MainContainer from '../components/Main';
import Whiteboxanim from '../components/Whiteboxanim';
// Importamos los componentes.

// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
    return (
        doctors && (
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
    );
};

export default DoctorListPage;
