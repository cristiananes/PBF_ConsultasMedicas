const MainContainer = ({ children }) => {
    return (
        <main className="overflow-y-hidden flex flex-col mt-20 items-center justify-center min-h-screen bg-[url('/public/fondoaz.jpg')] bg-cover bg-center">
            {children}
        </main>
    );
};

export default MainContainer;
