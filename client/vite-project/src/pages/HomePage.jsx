// Inicializamos el componente.
const HomePage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-eggblue to-ultraviolet py-10">
            {/* Contenedor superior para Logo y Eslogan */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl px-4 py-8">
                {/* Logo */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <img src="/public/Logo.jpg" alt="Logo" className="h-24" />
                </div>
                {/* Eslogan */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end text-center md:text-left mt-4 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800">
                        La plataforma que te ayudará a contactar con tu medico
                        de forma sencilla, rápida y eficaz.
                    </h2>
                </div>
            </div>

            {/* Imagen grande debajo */}
            <div className="w-full max-w-4xl px-4">
                <img
                    src="/public/globaldoctor.jpeg"
                    alt="Imagen doctores"
                    className="w-full h-auto rounded-lg shadow-md"
                />
            </div>
        </main>
    );
};

export default HomePage;
