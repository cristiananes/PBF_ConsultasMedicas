// Importamos los hooks.
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useConsult from '../hooks/useConsult';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos moment para manipular fechar.
import moment from 'moment';

// Importamos los componentes.
import MainContainer from '../components/Main';
import Whitebox from '../components/Whitebox';
//import EntryPhotos from "../components/EntryPhotos";

import DeleteConsultButton from '../components/DeleteConsultButton';

// Importamos los formularios.
//import AddPhotoForm from "../forms/AddPhotoForm";
import AddVoteForm from '../forms/AddVoteForm';
import Whitebox from '../components/Whitebox';

// Inicializamos el componente.
const ConsultDetailsPage = () => {
    // Obtenemos los datos del usuario.
    const { authUser } = useContext(AuthContext);

    // Obtenemos el ID de la consulta.
    const { consultId } = useParams();

    // Importamos los datos de la consulta.
    const {
        consultId,
        title,
        description,
        urgency,
        specialty,
        userId,
        file,
        DeleteConsultButton,
    } = useConsult(consultId);

    // Declaramos una variable para indicar cuando estamos haciendo fetch al servidor y poder
    // deshabilitar así los botones durante ese proceso.
    const [loading, setLoading] = useState(false);

    return (
        consult && (
            <MainContainer>
                <Whitebox>
                    <h2>Título: {consult.title}</h2>

                    {/* Establecemos las fotos. */}
                    <ConsultPhotos
                        authUser={authUser}
                        consult={consult}
                        deleteConsultPhotos={deleteConsultPhotos}
                        loading={loading}
                        setLoading={setLoading}
                    />

                    {/* {
          // Formulario de agregar foto. Solo será visible si hay menos de 3 fotos y si además
          // somos los dueños de la entrada. Dado que tanto usuarios logueados como no logeados
          // pueden acceder a los detalles de la página, podría suceder que "user" sea un valor
          // null (si no estamos logueados). Por tanto para evitar que JavaScript lance un error
          // si "user" es null utilizamos la interrogación.
          entry.photos.length < 3 && entry.userId === authUser?.id && (
            <AddPhotoForm
              entryId={entryId}
              updateEntryPhotos={updateEntryPhotos}
              loading={loading}
              setLoading={setLoading}
            />
          )
        } */}

                    <ul>
                        <li>Descripción: {consult.description}</li>
                        <li>Media de votos: {consult.votes}</li>
                        <li>Urgencia: {consult.urgency}</li>
                        <li>Especialidad: {consult.specialty}</li>
                        <li>Id de usuario: {consult.userId}</li>
                        <li>Archivos: {consult.file}</li>
                        <li>
                            Creado el{' '}
                            {moment(consult.createdAt).format(
                                'DD/MM/YYYY [a las] HH:mm'
                            )}
                        </li>
                    </ul>

                    {/* Formulario de votar. */}
                    <AddVoteForm
                        consultId={consultId}
                        updateConsultVotes={updateConsultVotes}
                        loading={loading}
                        setLoading={setLoading}
                    />

                    {
                        // Si estamos logueados y somos los dueños podemos borrar la entrada.
                        authUser && authUser.id === consult.userId && (
                            <DeleteConsultButton
                                consultId={consultId}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )
                    }
                </Whitebox>
            </MainContainer>
        )
    );
};

export default ConsultDetailsPage;
