//la base es declarar las variables, creas el codigo y en el htm
//igualas las variables
//Tengo que hacer un hook parecido a useEntries para la lista de
//doctores

//El hook tiene que hacer: EL fetch de la ruta de listDoctors del backend
//Decir necesito x info para que luego cuando haga la pagina de medicos
//solo tenga que pedirle los datos que necesito usando useDoctors.

//Si haces bien el hook de useEntries solo tengo que hacer como en
//la HomePage de Diario de viajes

// Importamos los hooks.

// Importamos el contexto.

// Importamos moment para manipular fechar.
import moment from "moment";
import useDoctors from "../hooks/useDoctors";

// Importamos los componentes.
import Header from "../components/Header";
import Footer from "../components/Footer";
// Importamos los formularios.

// Inicializamos el componente.
const DoctorListPage = () => {
  //Aqui tengo que extraer la lista de doctores del params
  // Importamos los datos de los doctores.
  //saco las variables
  const { doctors, Specialty } = useDoctors();

  // Declaramos una variable para indicar cuando estamos haciendo fetch al servidor y poder
  // deshabilitar así los botones durante ese proceso.

  return (
    doctors && (
      <main>
        <h2>Listado de medicos</h2>

        {/* Establecemos las fotos. */}

        <Header />

        <ul>
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <h3>{doctor.name}</h3>
              <p>Especialidad: {Specialty}</p>
              <p>
                Creado el{" "}
                {moment(doctor.createdAt).format("DD/MM/YYYY [a las] HH:mm")}
              </p>
            </li>
          ))}
        </ul>

        <Footer />
      </main>
    )
  );
};

export default DoctorListPage;
