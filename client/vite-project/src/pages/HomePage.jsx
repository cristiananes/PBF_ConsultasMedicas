// Importamos los componentes.
import { NavLink } from 'react-router-dom';
import MainContainer from '../components/Main';

// Inicializamos el componente.
// Importamos los hooks.
import { useContext } from 'react';

// Obtenemos el contexto.
import { AuthContext } from '../contexts/AuthContext';

const HomePage = () => {
    const { authUser } = useContext(AuthContext);
    return (
        <MainContainer>
            {/* Título principal */}
            <h1 className="text-5xl mt-20 font-extrabold text-white mb-2 animate-fadeIn">
                La plataforma de consultas médicas
            </h1>
            {/* Subtítulo */}
            <p className="text-2xl text-white mt-2 mb-10 animate-slideIn">
                Contacta con tu médico en un click.
            </p>

            {!authUser && (
                <NavLink to="/register">
                    <button className="animate-fadeIn ml-30 bg-blue-500 text-white px-20 py-3 rounded-md shadow hover:bg-blue-600 transition focus:ring-4 focus:ring-blue-300">
                        ¡Crea tu cuenta ahora!
                    </button>
                </NavLink>
            )}

            {authUser && (
                <div className="bg-white bg-opacity-40 backdrop-blur-lg mx-auto py-12 px-8 rounded-xl shadow-md w-full max-w-6xl mt-12">
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                        {/* Tarjeta 1: Consultas */}
                        <div className="flex flex-col items-center bg-white bg-opacity-90 p-8 shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="/public/consultas1.jpg"
                                alt="Consultas"
                                className="w-24 h-24 mb-6 rounded-full"
                            />
                            <NavLink
                                to="/consults"
                                className="text-xl font-semibold text-blue-700 hover:text-blue-500 transition-colors"
                            >
                                Consultas
                            </NavLink>
                        </div>

                        {/* Tarjeta 2: Listado de Médicos */}
                        <div className="flex flex-col items-center bg-white bg-opacity-90 p-8 shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="/public/listado1.jpg"
                                alt="Listado de Médicos"
                                className="w-24 h-24 mb-6 rounded-full"
                            />
                            <NavLink
                                to="/doctorList"
                                className="text-xl font-semibold text-blue-700 hover:text-blue-500 transition-colors"
                            >
                                Listado de Médicos
                            </NavLink>
                        </div>

                        {/* Tarjeta 3: Perfil de Usuario */}
                        <div className="flex flex-col items-center bg-white bg-opacity-90 p-8 shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
                            <img
                                src="/public/usuario.png"
                                alt="Perfil de Usuario"
                                className="w-24 h-24 mb-6 rounded-full"
                            />
                            <NavLink
                                to="/user/:userId"
                                className="text-xl font-semibold text-blue-700 hover:text-blue-500 transition-colors"
                            >
                                Perfil de Usuario
                            </NavLink>
                        </div>
                    </section>
                </div>
            )}
        </MainContainer>
    );
};

export default HomePage;
