const MainContainer = ({ children }) => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/public/fondoaz.jpg')] bg-cover bg-center">
            {children}
        </main>
    );
};

export default MainContainer;
