import { NavLink } from 'react-router-dom';

// Componente para HomeUserPage
const HomeUserPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Contenedor principal */}
            <main className="flex-grow grid grid-cols-3 gap-4 justify-items-center items-center bg-gray-100 py-10 px-6">
                {/* Bloque 1: Imagen + Texto Consultas */}
                <div className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
                    <img
                        src="/path-to-image1.jpg"
                        alt="Consultas"
                        className="w-32 h-32 mb-2"
                    />
                    <NavLink
                        to="/consultas"
                        className="text-lg font-semibold text-blue-500"
                    >
                        Consultas
                    </NavLink>
                </div>

                {/* Bloque 2: Imagen + Texto Listado de Médicos */}
                <div className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
                    <img
                        src="/path-to-image2.jpg"
                        alt="Listado de Médicos"
                        className="w-32 h-32 mb-2"
                    />
                    <NavLink
                        to="/medicos"
                        className="text-lg font-semibold text-blue-500"
                    >
                        Listado de Médicos
                    </NavLink>
                </div>

                {/* Bloque 3: Imagen + Texto Perfil de Usuario */}
                <div className="flex flex-col items-center bg-white p-4 shadow-md rounded-lg">
                    <img
                        src="/path-to-image3.jpg"
                        alt="Perfil de Usuario"
                        className="w-32 h-32 mb-2"
                    />
                    <NavLink
                        to="/perfil"
                        className="text-lg font-semibold text-blue-500"
                    >
                        Perfil de Usuario
                    </NavLink>
                </div>
            </main>
        </div>
    );
};

export default HomeUserPage;
