export const ButtonAction = ({ text }) => {
    return (
        <button className="col-span-2 w-full bg-ultraviolet text-white rounded-md px-6 py-3 mt-4 hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300">
            {' '}
            {text}
        </button>
    );
};
