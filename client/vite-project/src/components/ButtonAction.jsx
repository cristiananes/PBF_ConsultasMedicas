export const ButtonAction = ({ text, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="col-span-2 w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        >
            {' '}
            {text}
        </button>
    );
};
