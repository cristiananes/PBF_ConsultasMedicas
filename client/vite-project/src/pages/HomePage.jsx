import { ButtonAction } from '../components/ButtonAction';
// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Inicializamos el componente.
const HomePage = () => {
    return (
        <main className="flex flex-col items-start justify-center min-h-screen bg-[url('/public/fondo.jpg')] bg-cover bg-center py-10">
            {/* Contenedor principal centrado */}

            <div className="text-left ml-8">
                {/* Título principal */}
                <h1 className="text-3xl font-bold text-gray-800 bg-gray-300 bg-opacity-40 mb-4">
                    La plataforma de consultas médicas
                </h1>

                {/* Subtítulo */}
                <p className="text-1xl text-gray-600 mb-8">
                    Contacta con tu médico en un click.
                </p>

                {/* Botón de Registro */}
                <NavLink to="/register">
                    <ButtonAction text="Crea tu cuenta ahora!" />
                </NavLink>
            </div>
        </main>
    );
};

export default HomePage;
