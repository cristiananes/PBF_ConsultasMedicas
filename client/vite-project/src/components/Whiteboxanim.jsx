const Whiteboxanim = ({ children }) => {
    return (
        <div className="bg-white p-8 rounded-lg bg-opacity-70 shadow-xl max-w-md w-full animate-slideIn">
            {children}
        </div>
    );
};

export default Whiteboxanim;